import React, { useState } from "react";
import nft from "../assets/cool-dev.png";
//AI
// "The objective of this project is to develop a facial recognition system integrated with a doorbell to enable access control for a house. The system will utilize a camera to capture the face of a person at the door and compare it with a database of authorized individuals. If a match is found, the door will be automatically unlocked, allowing entry for the recognized person."

import { getContract, getAccount } from "../utils/contractHelpers";

const Project = ({ project, showApplyButton }) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [error, setError] = useState(false);

	const showMessage = () => {
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 4000);
	};

	const handleApply = async () => {
		setLoading(true);
		setSuccess(false);
		setError(false);

		try {
			const Contract = await getContract();
			const account = await getAccount();

			await Contract.methods.applyForProject(project.id).send({ from: account });
			setSuccess(true);
			showMessage();
		} catch (error) {
			setError(true);
			showMessage();
			console.error(error);
		}
		setLoading(false);
		if (success) showMessage();
	};

	const computeDate = () => {
		const formattedDate = new Date(project.deadline * 1000).toLocaleDateString("en-GB");
		return formattedDate;
	};

	return (
		<div className=" flex flex-col justify-center items-center ">
			<div className=" w-80  bg-color-footer shadow-xl shadow-sky-500 rounded-xl duration-500 hover:scale-105 opacity-75   hover:opacity-100  ">
				<a className="z-0" href={"https://gateway.pinata.cloud/ipfs/" + project.requirementsDocumentCID} target="_blank">
					<div className="flex flex-row">
						<img
							src={"https://gateway.pinata.cloud/ipfs/" + project.nftCID}
							alt={project.nftCID}
							className=" p-2 h-64 w-48 object-cover rounded-t-xl"
						/>

						<div className="mt-2 mr-2 p-2	w-[120px] h-60  ">
							<div className="flex flex-row">
								{" "}
								<label className="text-gray-400  text-bold ">Id </label>
								{project.state === "0" && (
									<div className="flex ml-auto">
										<div className="h-3 w-3 bg-green-500 rounded-full" />
									</div>
								)}
								{project.state === "1" && (
									<div className="flex ml-auto">
										<div className="h-3 w-3 bg-yellow-500 rounded-full" />
									</div>
								)}
								{project.state === "3" && (
									<div className="flex ml-auto">
										<div className="h-3 w-3 bg-red-500 rounded-full" />
									</div>
								)}
								{project.state === "2" && (
									<div className="flex ml-auto">
										<div className="h-3 w-3 bg-sky-500 rounded-full" />
									</div>
								)}
							</div>

							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{project.id}</p>
							</div>
							<label className="text-gray-400  text-bold ">Deadline </label>

							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{computeDate()}</p>
							</div>
							<label className="text-gray-400  text-bold ">Reward </label>
							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{project.reward}</p>
							</div>
							<label className="text-gray-400  text-bold ">Penalty </label>

							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{project.penalty}</p>
							</div>
						</div>
					</div>
					<div class="px-4 py-3 w-72">
						<span class="text-gray-400  uppercase text-bold	">Description</span>
						<div class="flex items-center ">
							<p class="text-gray-600  text-xs  ">{project.shortDescription}</p>
						</div>
					</div>
				</a>
			</div>
			{isAlertVisible && success && <p className="text-green-600 font-bold">You have successfully applied to this project!</p>}
			{isAlertVisible && error && <p className="text-red-600 font-bold">There was an error.</p>}

			{showApplyButton && (
				<button
					onClick={handleApply}
					className="z-10 mt-8 flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-r from-cyan-500 to-cyan-700"
				>
					<p className=" justify-center text-sm">{loading ? "Loading" : "Apply"}</p>
				</button>
			)}
		</div>
	);
};

export default Project;
