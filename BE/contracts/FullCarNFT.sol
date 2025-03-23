// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin 5.x 기준 import
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title FullCarNFT - 차량 등록, 거래, 담보, 보험 연동이 가능한 NFT 스마트 계약
contract FullCarNFT is ERC721Enumerable, Ownable {
    uint256 private _tokenIds;

    struct CarInfo {
        string carNumber;
        string manufactureDate;
        string model;
        string fuel;
        uint256 engineCC;
        string color;
        string warranty;
        string metadataURI; // IPFS URI
    }

    struct Insurance {
        address provider;
        uint256 premium;
        uint256 expiry;
        bool active;
    }

    mapping(uint256 => CarInfo) public carInfos;
    mapping(string => bool) public registeredCarNumbers;

    mapping(uint256 => address) public transferProposals;
    mapping(uint256 => uint256) public carPrices;

    mapping(uint256 => address) public collateralOwners;
    mapping(uint256 => uint256) public loanAmounts;

    mapping(uint256 => Insurance) public insurancePolicies;

    event CarNFTMinted(uint256 indexed tokenId, address indexed owner);
    event TransferProposed(uint256 indexed tokenId, address indexed to);
    event TransferAccepted(uint256 indexed tokenId, address indexed from, address indexed to);
    event CarListed(uint256 indexed tokenId, uint256 price);
    event CarSold(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event CollateralLocked(uint256 indexed tokenId, address indexed owner, uint256 loanAmount);
    event InsuranceLinked(uint256 indexed tokenId, address indexed provider, uint256 premium, uint256 expiry);

    /// @notice 생성자에서 초기 소유자 설정
    constructor(address initialOwner)
        ERC721("FullCarNFT", "CARX")
        Ownable(initialOwner)
    {}

    /// @notice 차량 등록 및 NFT 발행 (onlyOwner)
    function registerCar(
        address recipient,
        string memory carNumber,
        string memory manufactureDate,
        string memory model,
        string memory fuel,
        uint256 engineCC,
        string memory color,
        string memory warranty,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        require(!registeredCarNumbers[carNumber], "Car already registered");

        _tokenIds++;
        uint256 tokenId = _tokenIds;
        _safeMint(recipient, tokenId);

        carInfos[tokenId] = CarInfo(
            carNumber,
            manufactureDate,
            model,
            fuel,
            engineCC,
            color,
            warranty,
            metadataURI
        );

        registeredCarNumbers[carNumber] = true;

        emit CarNFTMinted(tokenId, recipient);
        return tokenId;
    }

    /// @notice 차량 정보 조회
    function getCarInfo(uint256 tokenId) public view returns (CarInfo memory) {
        ownerOf(tokenId); // 존재 확인용
        return carInfos[tokenId];
    }

    /// @notice NFT 판매 등록
    function listCarForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Invalid price");

        carPrices[tokenId] = price;
        emit CarListed(tokenId, price);
    }

    /// @notice NFT 차량 구매
    function buyCar(uint256 tokenId) public payable {
        uint256 price = carPrices[tokenId];
        require(price > 0, "Not for sale");
        require(msg.value >= price, "Insufficient payment");

        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);

        payable(seller).transfer(price);
        delete carPrices[tokenId];

        emit CarSold(tokenId, msg.sender, price);
    }

    /// @notice 전송 제안 등록
    function proposeTransfer(uint256 tokenId, address to) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        transferProposals[tokenId] = to;

        emit TransferProposed(tokenId, to);
    }

    /// @notice 제안 수락 후 전송
    function acceptTransfer(uint256 tokenId) public {
        require(transferProposals[tokenId] == msg.sender, "Not proposed to you");

        address from = ownerOf(tokenId);
        _transfer(from, msg.sender, tokenId);
        delete transferProposals[tokenId];

        emit TransferAccepted(tokenId, from, msg.sender);
    }

    /// @notice NFT를 담보로 설정
    function lockAsCollateral(uint256 tokenId, uint256 loanAmount) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");

        _transfer(msg.sender, address(this), tokenId); // 예치
        collateralOwners[tokenId] = msg.sender;
        loanAmounts[tokenId] = loanAmount;

        emit CollateralLocked(tokenId, msg.sender, loanAmount);
    }

    /// @notice 보험 연동
    function linkInsurance(uint256 tokenId, address provider, uint256 premium, uint256 expiry) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");

        insurancePolicies[tokenId] = Insurance(provider, premium, expiry, true);

        emit InsuranceLinked(tokenId, provider, premium, expiry);
    }

    /// @notice 보험 조회
    function getInsurance(uint256 tokenId) public view returns (Insurance memory) {
        ownerOf(tokenId); // 존재 확인
        return insurancePolicies[tokenId];
    }

    /// @notice 판매 여부 확인
    function isForSale(uint256 tokenId) public view returns (bool) {
        return carPrices[tokenId] > 0;
    }

    /// @notice 인터페이스 지원 확인
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}