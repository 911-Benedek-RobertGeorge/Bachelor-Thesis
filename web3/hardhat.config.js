/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
	solidity: "0.8.2",
	defaultNetwork: "mumbai",
	networks: {
		hardhat: {},
		goerli: {
			url: API_URL,
			accounts: [`0x${PRIVATE_KEY}`],
		},
		sepolia: {
			url: API_URL,
			accounts: [`0x${PRIVATE_KEY}`],
		},
		mumbai: {
			url: API_URL,
			accounts: [`0x${PRIVATE_KEY}`],
		},
	},
};
