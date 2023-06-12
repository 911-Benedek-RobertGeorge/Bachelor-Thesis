import React, { useEffect, useState } from "react";
import { getContract, getAccount, checkIfAddress } from "../utils/contractHelpers";

export const OwnerSection = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const [contract, setContract] = useState();
	const [account, setAccount] = useState();
	const [grantRoleAddress, setGrantRoleAddress] = useState("");
	const [revokeRoleAddress, setRevokeRoleAddress] = useState("");
	const [error, setError] = useState("");
	const [projectNumber, setProjectNumber] = useState(-1);
	const [newManagerAddress, setNewManagerAddress] = useState("");

	useEffect(() => {
		const fetchRole = async () => {
			setContract(await getContract());
			setAccount(await getAccount());
		};
		fetchRole();
	}, []);

	const grantManagerRole = async () => {
		try {
			if (!(await checkIfAddress(grantRoleAddress))) {
				setError("Invalid Address!");
			} else {
				setError("");
				await contract.methods.grantAdminRole(grantRoleAddress).send({ from: account });
			}
		} catch (error) {
			console.log(error);
		}
	};
	const changeManagerOfProject = async () => {
		try {
			await contract.methods.changeManagerOfProject(projectNumber, newManagerAddress).send({ from: account });
		} catch (error) {
			console.log(error);
		}
	};
	const revokeManagerRole = async () => {
		try {
			if (!(await checkIfAddress(revokeRoleAddress))) {
				setError("Invalid Address!");
			} else {
				setError("");
				await contract.methods.grantAdminRole(grantRoleAddress).send({ from: account });
				setSuccess(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex space-x-8">
			<div className="flex flex-col items-center space-y-4">
				<label className="font-bold text-lg text-white  ">Grant Manager Role</label>
				<input
					onChange={(e) => setGrantRoleAddress(e.target.value)}
					type="text"
					placeholder="Address"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>
				{error && grantRoleAddress && <p className="text-red-400">{error}</p>}
				<button
					className=" border border-indigo-600 bg-black text-white rounded-lg p-3 font-semibold"
					routerLink="/projects"
					onClick={grantManagerRole}
					disabled={loading}
				>
					{loading ? "Loading..." : "Make manager"}
				</button>
			</div>
			<div className="flex flex-col items-center space-y-4">
				<label className="font-bold text-lg text-white  ">Revoke Manager Role</label>
				<input
					onChange={(e) => setRevokeRoleAddress(e.target.value)}
					type="text"
					placeholder="Address"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>
				{error && revokeRoleAddress && <p className="text-red-400">{error}</p>}

				<button
					className=" border border-indigo-600 bg-black text-white rounded-lg p-3 font-semibold"
					routerLink="/projects"
					onClick={revokeManagerRole}
					disabled={loading}
				>
					{loading ? "Loading..." : "Revoke role"}
				</button>
			</div>
			<div className="flex flex-col items-center space-y-4">
				<label className="font-bold text-lg text-white  ">Change Manager </label>
				<input
					onChange={(e) => setProjectNumber(e.target.value)}
					type="number"
					placeholder="Project id"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>
				<input
					onChange={(e) => setNewManagerAddress(e.target.value)}
					type="text"
					placeholder="Address"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>
				{error && newManagerAddress && <p className="text-red-400">{error}</p>}

				<button
					className=" border border-indigo-600 bg-black text-white rounded-lg p-3 font-semibold"
					onClick={changeManagerOfProject}
					disabled={loading}
				>
					{loading ? "Loading..." : "Change Manager"}
				</button>
			</div>
		</div>
	);
};
