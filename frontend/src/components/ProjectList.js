import React from "react";
import Project from "./Project";

const ProjectList = ({ projects }) => {
	return (
		<div className="grid gap-4">
			{projects.map((project) => (
				<Project key={project.nrOfProjects} project={project} />
			))}
		</div>
	);
};

export default ProjectList;
