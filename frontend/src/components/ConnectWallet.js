import Web3 from "web3";
import React, { useState } from "react";

const ConnectButton = () => {
	const [connectedAccount, setConnectedAccount] = useState(null);

	const connectWallet = async () => {
		try {
			// Connect to MetaMask
			await window.ethereum.request({ method: "eth_requestAccounts" });

			// Get the connected account
			const web3 = new Web3(window.ethereum);
			const accounts = await web3.eth.getAccounts();
			const connectedAccount = accounts[0];

			// Update state with connected account
			setConnectedAccount(connectedAccount);
		} catch (error) {
			console.error(error);
		}
	};

	return <button onClick={connectWallet}>{connectedAccount ? `Connected: ${connectedAccount}` : "Connect Wallet"}</button>;
};

export default ConnectButton;
