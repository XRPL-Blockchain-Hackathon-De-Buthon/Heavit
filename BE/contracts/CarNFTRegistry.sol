// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarNFTRegistry {
    struct Car {
        string carNumber;
        string manufactureDate;
        string model;
        address owner;
    }

    Car[] public cars;
    mapping(uint256 => address) public carToOwner;
    mapping(address => uint256[]) public ownerToCars;

    event CarRegistered(
        uint256 carId,
        string carNumber,
        string manufactureDate,
        string model,
        address indexed owner
    );

    modifier onlyCarOwner(uint256 _carId) {
        require(carToOwner[_carId] == msg.sender, "Not the car owner");
        _;
    }

    function registerCar(
        string memory _carNumber,
        string memory _manufactureDate,
        string memory _model
    ) public {
        Car memory newCar = Car({
            carNumber: _carNumber,
            manufactureDate: _manufactureDate,
            model: _model,
            owner: msg.sender
        });

        cars.push(newCar);
        uint256 carId = cars.length - 1;
        carToOwner[carId] = msg.sender;
        ownerToCars[msg.sender].push(carId);

        emit CarRegistered(carId, _carNumber, _manufactureDate, _model, msg.sender);
    }

    function getCar(uint256 _carId) public view returns (
        string memory, string memory, string memory, address
    ) {
        require(_carId < cars.length, "Car does not exist");
        Car memory car = cars[_carId];
        return (car.carNumber, car.manufactureDate, car.model, car.owner);
    }

    function getCarsByOwner(address _owner) public view returns (uint256[] memory) {
        return ownerToCars[_owner];
    }

    function getTotalCars() public view returns (uint256) {
        return cars.length;
    }
}