const hre = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contractJson = require("../artifacts/contracts/WorkShare.sol/WorkShare.json");

console.log("Provider : ");

// Provider
const alchemyProvider = new hre.ethers.providers.AlchemyProvider("maticmum", API_KEY);
//console.log(alchemyProvider);

console.log("Signer : ");
// Signer
const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);
console.log(signer.address);

async function main() {
	const WorkShareFactory = await ethers.getContractFactory("WorkShare");

	// Start deployment, returning a promise that resolves to a contract object
	const workShareContract = await WorkShareFactory.deploy();
	console.log("Contract WorkShare deployed to address:", workShareContract.address);

	const WorkShareTokenFactory = await ethers.getContractFactory("WorkShareToken");
	const workShareTokenContract = await WorkShareTokenFactory.deploy();
	console.log("Contract WorkShareToken deployed to address:", workShareTokenContract.address);

	// const MasteryMilestoneFactory = await ethers.getContractFactory("MasteryMilestones");
	// const masteryMilestoneContract = await MasteryMilestoneFactory.deploy();
	// console.log("Contract MasteryMilestone deployed to address:", masteryMilestoneContract.address);

	//initialize(token address,commission, nft address)
	const tx = await workShareContract.initialize(workShareTokenContract.address, 5);
	await tx.wait();
	console.log(tx);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
