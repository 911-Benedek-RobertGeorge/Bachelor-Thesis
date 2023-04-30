import React from "react";
import { Header } from "../components/Header";
import Project from "../components/Project";
const project = {
	shortDescription: "asdasdas",
	requirementsDocumentCID: "asddsadasSDad",
	reward: 1234,
	deadline: 123412341234,
};
export const Projects = () => {
	return (
		<div className=" mx-auto bg-gradient-to-b from-color-bg to-footer-color h-screen w-full h-screen flex flex-col items-center  ">
			<Header className=" " />
			<Project project={project}></Project>
		</div>
	);
};
