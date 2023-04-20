import React, { useState, useEffect } from "react";
import Web3 from "web3";
import WorkShare from "./contracts/WorkShare.json";
import { Header } from "./components/Header";
import { Section } from "./components/Section";

export const App = () => {
	return (
		<div>
			<Header />
			<Section />
		</div>
	);
};

// function App() {
// 	const [nrOfDevelopers, setNrOfDevelopers] = useState(0);
// 	const [nrOfProjects, setNrOfProjects] = useState(0);
// 	const [contract, setContract] = useState(undefined);
// 	const [web3, setWeb3] = useState(undefined);

// 	useEffect(() => {
// 		async function fetchData() {
// 			// Connect to the blockchain
// 			const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// 			// Get the contract instance
// 			const networkId = await web3.eth.net.getId();
// 			console.log("network id: " + networkId);
// 			const deployedNetwork = WorkShare.networks[networkId];
// 			console.log("deployedNetwork id: " + deployedNetwork);

// 			const contract = new web3.eth.Contract(WorkShare.abi, deployedNetwork && deployedNetwork.address);
// 			console.log("contract : " + contract);

// 			// Fetch data from the contract
// 			const nrOfDevelopers = await contract.methods.nrOfDevelopers().call();
// 			const nrOfProjects = await contract.methods.nrOfProjects().call();

// 			// Store the data in component state

// 			setWeb3(web3);

// 			setContract(contract);
// 			setNrOfDevelopers(nrOfDevelopers);
// 			setNrOfProjects(nrOfProjects);
// 		}

// 		fetchData();
// 	}, []);

// 	return (
// 		<div>
// 			<p>Number of developers: {nrOfDevelopers}</p>
// 			<p>Number of projects: {nrOfProjects}</p>
// 		</div>
// 	);
// }

export default App;
