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
		getProjects();
	}, []);

	const getProjects = async () => {
		try {
			const contract = await getContract();
			const account = await getAccount();

			const result = await contract.methods.getMyProjectsAdmin().call({ from: account });

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

			setProjectList(formattedProjects);

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
			<ProjectList projects={projectList} showApplyButton={false}></ProjectList>
		</div>
	);
};
