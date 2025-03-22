const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// Root Network Provider + Wallet
//const provider = new ethers.JsonRpcProvider(process.env.ROOT_NETWORK_RPC);
//const wallet = new ethers.Wallet(process.env.ROOT_NETWORK_PRIVATE_KEY, provider);

// XRPL EVM 사이드체인 설정
const provider = new ethers.JsonRpcProvider(process.env.XRPL_EVM_SIDECHAIN_RPC);
const wallet = new ethers.Wallet(process.env.XRPL_EVM_SIDECHAIN_DEVNET_PRIVATE, provider);

// Car NFT Smart Contract ABI & Address
//const CAR_NFT_ABI = [
  //"function registerCar(string,string,string)",
  //"function getCar(uint256) view returns (string,string,string,address)",
  //"function getCarsByOwner(address) view returns (uint256[])",
  //"function getTotalCars() view returns (uint256)",
  //"event CarRegistered(uint256 carId, string carNumber, string manufactureDate, string model, address indexed owner)"
//];
const carNFTJson = require('../build/contracts/CarNFTRegistry.json');
const CAR_NFT_ADDRESS = process.env.CAR_NFT_CONTRACT_ADDRESS;

// Smart Contract Instance
const carNFTContract = new ethers.Contract(CAR_NFT_ADDRESS, carNFTJson.abi, wallet);

// ▶ 자동차 등록
app.post('/api/register', async (req, res) => {
  try {
    const { carNumber, manufactureDate, model } = req.body;

    const tx = await carNFTContract.registerCar(carNumber, manufactureDate, model);
    await tx.wait();

    res.json({ message: 'Car registered successfully', txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register car' });
  }
});

// ▶ 단일 자동차 정보 조회
app.get('/api/car/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const [carNumber, manufactureDate, model, owner] = await carNFTContract.getCar(carId);

    res.json({ carId, carNumber, manufactureDate, model, owner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get car data' });
  }
});

// ▶ 사용자 지갑 주소로 자동차 목록 조회
app.get('/api/cars/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const carIds = await carNFTContract.getCarsByOwner(address);

    res.json({ address, carIds: carIds.map(id => id.toString()) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get cars by owner' });
  }
});

// ▶ 전체 등록된 자동차 수
app.get('/api/total-cars', async (req, res) => {
  try {
    const count = await carNFTContract.getTotalCars();
    res.json({ totalCars: count.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get total cars' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚗 Car NFT server running on http://localhost:${port}`);
});
