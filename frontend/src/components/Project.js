import React, { useState } from "react";
import nft from "../assets/cool-dev.png";

const Project = ({ project }) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleApply = async () => {
		setLoading(true);

		try {
			const Contract = new Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
			await Contract.methods.apply(projectId).send({ from: account });
			setSuccess(true);
		} catch (error) {
			console.error(error);
		}

		setLoading(false);
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
						<img src={nft} alt={project.requirementsDocumentCID} className=" p-2 h-64 w-48 object-cover rounded-t-xl" />
						<div className="mt-2 mr-2 p-2	w-[120px] h-60  ">
							<label className="text-gray-400  text-bold ">Deadline:</label>

							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{computeDate()}</p>
							</div>
							<label className="text-gray-400  text-bold ">Reward:</label>
							<div className="flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-b from-purple-700 to-indigo-900">
								<p className=" justify-center text-sm">{project.reward}</p>
							</div>
							<label className="text-gray-400  text-bold ">Penalty:</label>

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
			<button
				onClick={handleApply}
				className="z-10 mt-8 flex justify-center items-center p-2 w-28 rounded-lg  text-white bg-gradient-to-r from-cyan-500 to-cyan-700"
			>
				<p className=" justify-center text-sm">Apply </p>
			</button>
		</div>
	);
};

export default Project;
