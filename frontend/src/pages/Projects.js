import React, { useState, useEffect } from "react";
import { Header } from "../containers/Header";
import ProjectList from "../components/ProjectList";
import { getContract } from "../utils/contractHelpers";

export const Projects = () => {
	function ProjectDto(id, reward, penalty, deadline, state, shortDescription, requirementsDocumentCID, nftCID) {
		this.id = id;
		this.reward = reward;
		this.penalty = penalty;
		this.deadline = deadline;
		this.state = state;
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
			const formattedProjects = result.reduce((acc, project) => {
				if (project.state === "0") {
					//OPEN

					acc.push(
						new ProjectDto(
							project.id,
							project.reward,
							project.penalty,
							project.deadline,
							project.state,
							project.shortDescription,
							project.requirementsDocumentCID,
							project.nftCID
						)
					);
				}
				return acc;
			}, []);

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
