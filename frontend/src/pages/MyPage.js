import React, { useState, useEffect } from "react";
import { Header } from "../containers/Header";
import { getContractAddress, getContractABI, getContract, getWeb3, getAccount, getTokenContract } from "../utils/contractHelpers";
import { ManagerSection } from "../containers/ManagerSection";
import { MyProjects } from "./MyProjects";
import { OwnerSection } from "../containers/OwnerSection";

export const MyPage = () => {
	const [owner, setOwner] = useState(false);
	const [manager, setManager] = useState(false);
	const [developer, setDeveloper] = useState(false);
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(false);
	const [projectNumber, setProjectNumber] = useState(-1);

	useEffect(() => {
		getRole();
	}, []);

	const getRole = async () => {
		try {
			const contract = await getContract();
			const account = await getAccount();
			const tokenContract = await getTokenContract();
			setBalance(await tokenContract.methods.balanceOf(account).call({ from: account }));

			const owner = await contract.methods.owner().call();
			if (owner === account) {
				setOwner(true);
				setManager(true);
			} else {
				try {
					//call this function to see if the connected account is an ADMIN
					await contract.methods.getEmailOfDeveloper(account).call({ from: account });
					setManager(true);
				} catch (e) {
					console.log(e);
					setDeveloper(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const applyToProject = async () => {
		try {
			const contract = await getContract();
			const account = await getAccount();
			await contract.methods.applyForProject(projectNumber).send({ from: account });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className=" flex flex-col bg-gradient-to-b from-color-bg to-footer-color   items-center space-y-8 ">
			<Header />

			<h3 className=" text-white text-sm font-semibold rounded">{`WST balance: ${balance}`}</h3>

			{owner && <OwnerSection />}
			{manager && <ManagerSection />}
			{!manager && !owner && <p>AICI PUNE developer</p>}
			<div className="flex flex-col space-y-4">
				<label class="font-bold text-lg text-white">Apply to Project</label>
				<input
					type="number"
					onChange={(e) => setProjectNumber(e.target.value)}
					placeholder="Project number"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>
				<button
					className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
					routerLink="/projects"
					onClick={applyToProject}
					disabled={loading}
				>
					{loading ? "Loading..." : "Apply"}
				</button>

				<div className="flex flex-span"></div>
			</div>
			<MyProjects />
		</div>
	);
};
