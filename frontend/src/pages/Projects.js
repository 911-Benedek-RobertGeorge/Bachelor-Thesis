import React, { useState, useEffect } from "react";
import { Header } from "../containers/Header";
import ProjectList from "../components/ProjectList";
import { getContract } from "../utils/contractHelpers";

export const Projects = () => {
	function ProjectDto(id, reward, penalty, deadline, shortDescription, requirementsDocumentCID, nftCID) {
		this.id = id;
		this.reward = reward;
		this.penalty = penalty;
		this.deadline = deadline;
		this.shortDescription = shortDescription;
		this.requirementsDocumentCID = requirementsDocumentCID;
		this.nftCID = nftCID;
	}
	const [projectList, setProjectList] = useState([]);

	const [error, setError] = useState("");

	useEffect(() => {
		getProjects();
	}, []);

	const getProjects = async () => {
		try {
			const contract = await getContract();

			// get the projects from the blockchain
			const result = await contract.methods.getOpenProjects().call();

			/// same them in the format we need
			const formattedProjects = result.map(
				(project) =>
					new ProjectDto(
						project.id,
						project.reward,
						project.penalty,
						project.deadline,
						project.shortDescription,
						project.requirementsDocumentCID,
						project.nftCID
					)
			);

			setProjectList(formattedProjects);
		} catch (e) {
			setError("An error occurred while fetching the data" + e);
			console.log(error);
		}
	};

	return (
		<div className=" mx-auto bg-gradient-to-b from-color-bg to-footer-color w-full flex flex-col items-center  ">
			<Header />
			<ProjectList projects={projectList} showApplyButton={true}></ProjectList>
		</div>
	);
};
