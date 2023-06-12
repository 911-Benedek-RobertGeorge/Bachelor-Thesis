import Web3 from "web3";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;

const { abi } = require("../contracts/WorkShare.json");
const { tokenAbi } = require("../contracts/WorkShareToken.json");

//console.log("THE ABI " + abi);
let account = "";
let web3 = undefined;
let contract = undefined;
let tokenContract = undefined;

const getWeb3 = async () => {
	// Modern dapp browsers
	console.log("GET Web3");
	if (web3 !== undefined) return web3;
	if (window.ethereum) {
		console.log("Compute Web3");
		web3 = new Web3(window.ethereum);
		try {
			// Request account access if needed
			await window.ethereum.enable();
			return web3;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	// Legacy dapp browsers
	else if (window.web3) {
		// Use Mist/MetaMask's provider
		web3 = window.web3;
		console.log("Injected web3 detected.");
		return web3;
	}
	// Fallback to localhost; use dev console port by default...
	else {
		const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
		web3 = new Web3(provider);
		console.log("No web3 instance injected, using Local web3.");
		return web3;
	}
};

const getContract = async () => {
	try {
		console.log("GET Contract");
		if (contract === undefined) {
			console.log("Compute Contract");

			web3 = await getWeb3();
			contract = new web3.eth.Contract(abi, contractAddress);
		}

		return contract;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getTokenContract = async () => {
	try {
		if (tokenContract === undefined) {
			web3 = await getWeb3();
			tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
		}

		return tokenContract;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getContractAddress = () => {
	return contractAddress;
};

const getContractABI = () => {
	return abi;
};

const getAccount = async () => {
	if (account === "") {
		const accounts = await web3.eth.getAccounts();
		account = accounts[0];
	}
	return account;
};

const checkIfAddress = async (address) => {
	return await web3.utils.isAddress(address);
};

export { checkIfAddress, getWeb3, getContract, getTokenContract, getContractAddress, getContractABI, getAccount };
