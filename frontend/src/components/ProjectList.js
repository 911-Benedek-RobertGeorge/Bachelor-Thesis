import React from "react";
import Project from "./Project";

const ProjectList = ({ projects, showApplyButton }) => {
	return (
		<div>
			<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
				{projects.map((project) => (
					<Project key={project.id} project={project} showApplyButton={showApplyButton} />
				))}
			</section>
		</div>
	);
};

export default ProjectList;
