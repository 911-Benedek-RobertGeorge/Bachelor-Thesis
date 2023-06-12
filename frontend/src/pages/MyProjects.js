import React, { useState, useEffect } from "react";
import { getContract, getAccount } from "../utils/contractHelpers";
import { Header } from "../containers/Header";
import ProjectList from "../components/ProjectList";

export const MyProjects = () => {
	function ProjectDto(id, nrOfApplicants, reward, penalty, deadline, shortDescription, requirementsDocumentCID, nftCID) {
		this.id = id;
		this.nrOfApplicants = nrOfApplicants;
		this.reward = reward;
		this.penalty = penalty;
		this.deadline = deadline;
		this.shortDescription = shortDescription;
		this.requirementsDocumentCID = requirementsDocumentCID;
		this.nftCID = nftCID;
	}
	const [projectList, setProjectList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [contract, setContract] = useState();
	const [account, setAccount] = useState();
	const projects = [];

	useEffect(() => {
		const fetchRole = async () => {
			setContract(await getContract());
			setAccount(await getAccount());
			console.log("ACCOUNT fetchRole: " + account);
		};
		fetchRole();

		getProjects();
		console.log("CALL USE EFFECT ");
	}, []);

	const getProjects = async () => {
		try {
			console.log("start get projects ");
			const contract = await getContract();
			const account = await getAccount();
			console.log("CONTRACT: ", contract);
			console.log("ACCOUNT : ");
			console.log(account);
			const result = await contract.methods.getMyProjectsAdmin().call({ from: account });
			console.log("The resul is :  ");
			console.log(result);
			//console.log(result._method);
			console.log("The LIST ");
			//console.log(result._method.outputs);
			// console.log("Transaction hash:", result.transactionHash);
			const formattedProjects = result.map(
				(project) =>
					new ProjectDto(
						project.id,
						project.nrOfApplicants,
						project.reward,
						project.penalty,
						project.deadline,
						project.shortDescription,
						project.requirementsDocumentCID,
						project.nftCID
					)
			);

			console.log("PROJECTS : ");
			console.log(formattedProjects);
			setProjectList(formattedProjects);

			//console.log("Transaction hash:", JSON.stringify(result._method.outputs[0])); // how to get the array of projects ?

			setSuccess(true);
		} catch (e) {
			setError("An error occurred while fetching the data" + e);
			console.log(error);
		}

		setLoading(false);
	};

	return (
		<div className=" flex flex-col items-center">
			<h1 className="text-white"> My Projects List</h1>
			<ProjectList projects={projectList}></ProjectList>
		</div>
	);
};
