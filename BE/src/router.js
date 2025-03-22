const express = require('express');
const { ethers } = require('ethers');

const router = express.Router();

let carNFTContract;
let wallet;

function setDependencies(contractInstance, walletInstance) {
  carNFTContract = contractInstance;
  wallet = walletInstance;

  if (carNFTContract && carNFTContract.interface) {
    console.log('CarNFT Contract ABI:', JSON.stringify(carNFTContract.interface.format('json'), null, 2));
  } else {
    console.error('CarNFT contract is not properly initialized');
  }
}

// 🚗 1. 자동차 등록
router.post('/cars/register', async (req, res) => {
  try {
    const { carNumber, manufactureDate, model } = req.body;

    if (!carNumber || !manufactureDate || !model) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const tx = await carNFTContract.registerCar(carNumber, manufactureDate, model, { gasLimit: 300000 });
    console.log('Transaction sent:', tx.hash);

    const receipt = await tx.wait(2);
    console.log('Transaction confirmed:', receipt.transactionHash);

    let carId;

    if (receipt.logs) {
      for (const log of receipt.logs) {
        try {
          if (log.topics[0] === ethers.id("CarRegistered(uint256,string,string,string,address)")) {
            const decodedLog = carNFTContract.interface.parseLog({
              topics: log.topics,
              data: log.data
            });
            carId = decodedLog.args.carId;
            console.log('CarRegistered Event - Car ID:', carId.toString());
            break;
          }
        } catch (err) {
          console.log('Log parsing error:', err.message);
        }
      }
    }

    if (!carId) {
      const total = await carNFTContract.getTotalCars();
      carId = BigInt(total) - 1n;
    }

    res.json({ success: true, carId: carId.toString(), transactionHash: receipt.hash });
  } catch (error) {
    console.error('Car registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🚗 2. 자동차 단일 조회
router.get('/cars/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const [carNumber, manufactureDate, model, owner] = await carNFTContract.getCar(carId);

    res.json({
      success: true,
      car: {
        id: carId,
        carNumber,
        manufactureDate,
        model,
        owner
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Car not found or invalid ID' });
  }
});

// 🚗 3. 특정 주소의 자동차 ID 목록 조회
router.get('/cars/owner/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const carIds = await carNFTContract.getCarsByOwner(address);

    res.json({
      success: true,
      owner: address,
      carIds: carIds.map(id => id.toString())
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🚗 4. 전체 등록된 자동차 개수 조회
router.get('/cars', async (req, res) => {
  try {
    const count = await carNFTContract.getTotalCars();
    res.json({ success: true, totalCars: count.toString() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = {
  router,
  setDependencies
};