const CarNFTRegistry = artifacts.require("CarNFTRegistry");

module.exports = function (deployer) {
  deployer.deploy(CarNFTRegistry);
};