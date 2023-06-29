import Web3 from "web3";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;

const { abi } = require("../contracts/WorkShare.json");
const { tokenAbi } = require("../contracts/WorkShareToken.json");

let account = "";
let web3 = undefined;
let contract = undefined;
let tokenContract = undefined;

const getWeb3 = async () => {
	if (web3 !== undefined) return web3;
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		try {
			await window.ethereum.enable();
			return web3;
		} catch (error) {
			console.error(error);
			return null;
		}
	} else if (window.web3) {
		web3 = window.web3;
		console.log("Injected web3 detected.");
		return web3;
	} else {
		const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
		web3 = new Web3(provider);
		console.log("No web3 instance injected, using Local web3.");
		return web3;
	}
};

const getContract = async () => {
	try {
		if (contract === undefined) {
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

const getPrice = async () => {
	return await tokenContract.methods.tokenPrice().call();
};

export { getPrice, checkIfAddress, getWeb3, getContract, getTokenContract, getContractAddress, getContractABI, getAccount };
