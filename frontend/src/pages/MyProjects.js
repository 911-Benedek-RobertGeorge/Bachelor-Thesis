import React, { useState, useEffect } from "react";
import { getContract, getAccount } from "../utils/contractHelpers";
import { Header } from "../containers/Header";
import ProjectList from "../components/ProjectList";

export const MyProjects = ({ manager }) => {
	function ProjectDto(
		id,
		nrOfApplicants,
		reward,
		penalty,
		deadline,
		manager,
		shortDescription,
		state,
		requirementsDocumentCID,
		nftCID,
		acceptedDeveloper
	) {
		this.id = id;
		this.nrOfApplicants = nrOfApplicants;

		this.reward = reward;
		this.penalty = penalty;
		this.deadline = deadline;
		this.manager = manager;
		this.shortDescription = shortDescription;
		this.state = state;
		this.requirementsDocumentCID = requirementsDocumentCID;
		this.nftCID = nftCID;
		this.acceptedDeveloper = acceptedDeveloper;
	}
	const [projectList, setProjectList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		getProjects();
	}, []);

	const getProjects = async () => {
		try {
			const contract = await getContract();
			const account = await getAccount();
			var result;

			result = await contract.methods.getOpenProjects().call({ from: account });
			console.log(result);
			const formattedProjects = result.reduce((acc, project) => {
				if (manager && project.manager === account) {
					acc.push(
						new ProjectDto(
							project.id,
							project.nrOfApplicants,
							project.reward,
							project.penalty,
							project.deadline,
							project.manager,
							project.shortDescription,
							project.state,
							project.requirementsDocumentCID,
							project.nftCID,
							project.acceptedDeveloper
						)
					);
				} else if (!manager && project.acceptedDeveloper === account) {
					acc.push(
						new ProjectDto(
							project.id,
							project.nrOfApplicants,
							project.reward,
							project.penalty,
							project.deadline,
							project.manager,
							project.shortDescription,
							project.state,
							project.requirementsDocumentCID,
							project.nftCID,
							project.acceptedDeveloper
						)
					);
				}

				return acc;
			}, []);
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
