import React from "react";
import { ProjectForm } from "../containers/ProjectForm";
import { Header } from "../containers/Header";

export const CreateProject = () => {
	return (
		<div className="bg-gradient-to-b from-color-bg to-footer-color">
			<Header />
			<ProjectForm />
		</div>
	);
};
