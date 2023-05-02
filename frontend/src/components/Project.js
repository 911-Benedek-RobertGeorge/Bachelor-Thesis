import React from "react";
import nft from "../assets/cool-dev.png";

const Project = ({ project }) => {
	const computeDate = () => {
		const formattedDate = new Date(project.deadline * 1000).toLocaleDateString("en-GB");
		return formattedDate;
	};
	return (
		<>
			<div className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
				<a href={"https://gateway.pinata.cloud/ipfs/" + project.requirementsDocumentCID} target="_blank">
					<div className="flex flex-row">
						<img src={nft} alt={project.requirementsDocumentCID} className=" p-2 h-64 w-48 object-cover rounded-t-xl" />
						<div className="mt-4 	w-32 h-full bg-indigo-200">
							<label className="text-gray-400 mt-8 text-bold ">Deadline:</label>

							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{computeDate()}</p>
							</div>

							<div className="flex rounded-2xl bg-color-bg  m-4 items-center  ">
								<span class="text-cyan-300 text-bold  ">{project.reward}</span>{" "}
							</div>
						</div>
					</div>
					<div class="px-4 py-3 w-72">
						<span class="text-gray-400 mr-3 uppercase text-bold	">Description</span>
						<div class="flex items-center">
							<p class="text-gray-600 mr-3 text-xs">{project.shortDescription}</p>
						</div>
					</div>
				</a>
			</div>

			<div className="bg-blue rounded-lg shadow p-6">
				<h2 className="text-lg font-bold mb-4">{project.shortDescription}</h2>
				<p className="text-gray-600 mb-4">{project.requirementsDocumentCID}</p>
				<p className="text-gray-600 mb-4">{project.reward}</p>
				<p className="text-gray-600 mb-4">{project.deadline}</p>
			</div>
		</>
	);
};

export default Project;
