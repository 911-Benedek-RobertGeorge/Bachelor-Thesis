import "./GetMail.css";
import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { getContractAddress, getContractABI, getContract, getWeb3, getAccount } from "../../utils/contractHelpers";
import web3 from "web3";

export const GetMail = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleRegister = async () => {
		// const theError = validate(email);
		// if (theError !== {}) {
		// setError(theError.email);
		// return;
		// }

		setLoading(true);

		try {
			const contract = await getContract();
			const account = await getAccount();
			const result = await contract.methods.register(email).send({
				from: account,
			});
			console.log("Transaction hash:", result.transactionHash);

			//const nrOfDevelopers = await contract.methods.nrOfDevelopers();
			//console.log(nrOfDevelopers); // get the number

			setSuccess(true);
		} catch (e) {
			setError("An error occurred while registering your email" + e);
		}

		setLoading(false);
	};
	return (
		<div className=" flex items-center gap-4">
			<input
				type="email"
				id="email"
				className="w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-color-bg border border-color-text text-lg text-color-text font-bold text-sm rounded-xl  focus:border-blue-500    p-3  "
				placeholder="email@company.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			></input>
			{error && <p style={{ color: "red" }}>{error.message}</p>}
			{success && <p style={{ color: "green" }}>Successfully registered {email}!</p>}

			<button type="submit" className="button z-10" disabled={loading} onClick={handleRegister}>
				{loading ? "Loading..." : "Register"}
			</button>
		</div>
	);
};
