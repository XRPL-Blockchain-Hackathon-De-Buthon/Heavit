const FullCarNFT = artifacts.require("FullCarNFT");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0]; // 초기 소유자 주소
  await deployer.deploy(FullCarNFT, owner);
};