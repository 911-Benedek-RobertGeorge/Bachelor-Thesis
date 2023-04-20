import React from "react";

const Project = ({ project }) => {
	return (
		<div className="bg-blue rounded-lg shadow p-6">
			<h2 className="text-lg font-bold mb-4">{project.shortDescription}</h2>
			<p className="text-gray-600 mb-4">{project.requirementsDocumentCID}</p>
			<p className="text-gray-600 mb-4">{project.reward}</p>
			<p className="text-gray-600 mb-4">{project.deadline}</p>
		</div>
	);
};

export default Project;
