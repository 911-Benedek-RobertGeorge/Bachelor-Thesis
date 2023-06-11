import React, { useState, useEffect } from "react";
import { Header } from "../containers/Header";
import { getContractAddress, getContractABI, getContract, getWeb3, getAccount } from "../utils/contractHelpers";
import { ManagerSection } from "../containers/ManagerSection";
import { MyProjects } from "./MyProjects";
import { OwnerSection } from "../containers/OwnerSection";

export const MyPage = () => {
	const [owner, setOwner] = useState(false);
	const [manager, setManager] = useState(false);
	const [developer, setDeveloper] = useState(false);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getRole();
		console.log("CALL USE EFFECT");
	}, []);

	const getRole = async () => {
		try {
			const contract = await getContract();
			const account = await getAccount();

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
		<div className=" flex flex-col bg-gradient-to-b from-color-bg to-footer-color h-screen items-center space-y-8 ">
			<Header />
			{owner && <OwnerSection />}
			{manager && <ManagerSection />}

			<MyProjects />
		</div>
	);
};
