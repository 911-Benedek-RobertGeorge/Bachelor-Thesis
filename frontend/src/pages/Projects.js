import React from "react";
import { Header } from "../containers/Header";
import Project from "../components/Project";
const project = {
	shortDescription:
		"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
	requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
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
