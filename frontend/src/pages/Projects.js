import React from "react";
import { Header } from "../containers/Header";
import Project from "../components/Project";
import ProjectList from "../components/ProjectList";
const project = {
	shortDescription:
		"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
	requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
	reward: 1234,
	penalty: 100,
	nrOfApplicants: 0,
	deadline: 123412341234,
};
const projects = [
	{
		id: 1,
		shortDescription:
			"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		nftCID: "QmNjyhvpfxWFGPSja3vMsKE5bUAtvsgzBRgRN4Sq4VK3dp",
		reward: 1234,
		penalty: 100,
		nrOfApplicants: 1,

		deadline: 123412341234,
	},
	{
		id: 2,
		shortDescription:
			"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		nftCID: "QmNjyhvpfxWFGPSja3vMsKE5bUAtvsgzBRgRN4Sq4VK3dp",

		reward: 1234,
		penalty: 100,
		nrOfApplicants: 3,
		deadline: 123412341234,
	},
	{
		id: 3,
		shortDescription:
			"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		nftCID: "QmNjyhvpfxWFGPSja3vMsKE5bUAtvsgzBRgRN4Sq4VK3dp",

		reward: 1234,
		penalty: 100,
		nrOfApplicants: 3,
		deadline: 123412341234,
	},
	{
		id: 4,
		shortDescription:
			"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		reward: 1234,
		penalty: 100,
		nrOfApplicants: 3,
		deadline: 123412341234,
	},
	{
		id: 5,
		shortDescription:
			"ou can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		reward: 1234,
		penalty: 100,
		nrOfApplicants: 3,
		deadline: 123412341234,
	},
	{
		id: 6,
		shortDescription:
			"ou can also use varsdasdasdsadasdsadasdasdas asd sa dasdasdas as dasdas asd asd asiant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:transition-all to apply the transition-all utility at only medium screen sizes and above.",
		requirementsDocumentCID: "Qmba4dwS9THKQCrBSXHLYhH9eKyTCAfxZmjztu1keLpgD6",
		reward: 1234,
		penalty: 100,
		nrOfApplicants: 3,
		deadline: 123412341234,
	},
];
export const Projects = () => {
	return (
		<div className=" mx-auto bg-gradient-to-b from-color-bg to-footer-color w-full flex flex-col items-center  ">
			<Header />
			<button className="bg-color-logo"> My projects</button>
			<ProjectList projects={projects}></ProjectList>
		</div>
	);
};
