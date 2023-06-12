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
	return (
		<div className=" flex flex-col bg-gradient-to-b from-color-bg to-footer-color   items-center space-y-8 ">
			<Header />

			<h3 className=" text-white text-sm font-semibold rounded">{`WST balance: ${balance}`}</h3>

			{owner && <OwnerSection />}
			{manager && <ManagerSection />}
			<div> 

			</div>
			<MyProjects />
		</div>
	);
};
