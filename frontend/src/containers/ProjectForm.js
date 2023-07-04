import React, { useState } from "react";
import { getTokenContract, getContract, getAccount, getContractAddress } from "../utils/contractHelpers";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export const ProjectForm = () => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const showMessage = () => {
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 4000);
	};

	const [shortDescription, setShortDescription] = useState("");
	const [requirementsDocumentCID, setRequirementsDocumentCID] = useState("");
	const [NFTCID, setNFTCID] = useState("");

	const [reward, setReward] = useState(0);
	const [penalty, setPenalty] = useState(0);
	const [deadline, setDeadline] = useState(0);
	const handleDeadline = (date) => {
		setDeadline(date);
	};

	const createProject = async () => {
		setLoading(true);
		try {
			const tokenContract = await getTokenContract();
			const contract = await getContract();
			const account = await getAccount();
			const giveAllowanceTx = await tokenContract.methods.approve(await getContractAddress(), reward).send({
				from: account,
			});
			console.log(giveAllowanceTx);

			const tx = await contract.methods
				.createProject(shortDescription, requirementsDocumentCID, NFTCID, reward, penalty, Math.floor(deadline / 1000))
				.send({
					from: account,
				});

			setSuccess(true);
			showMessage();
		} catch (error) {
			setError("Error creating project:", error);
		}
		setLoading(false);
	};

	return (
		<div class="relative min-h-screen  grid  ">
			<div class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
				<div class=" w-full space-y-12">
					<div class="lg:text-left text-center">
						<div class="flex items-center justify-center ">
							<div class="w-[70%] bg-gradient-to-b from-color-bg to-black grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg shadow-color-logo rounded-lg px-8 py-10">
								<div className=" flex flex-col space-y-4 ">
									<label class="font-bold text-lg text-white  ">Project description CID</label>
									<input
										onChange={(e) => setRequirementsDocumentCID(e.target.value)}
										type="text"
										formControlName="projectCID"
										placeholder="Project description CID"
										class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
									></input>
									<label class="font-bold text-lg text-white  ">NFT image CID</label>
									<input
										onChange={(e) => setNFTCID(e.target.value)}
										type="text"
										formControlName="nftCID"
										placeholder="NFT image CID"
										className="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
									></input>

									<label for="description" class="font-bold text-lg text-white ">
										Short Description
									</label>
									<textarea
										onChange={(e) => setShortDescription(e.target.value)}
										id="description"
										maxlength="250"
										rows="5"
										className="border rounded-lg py-3 px-3 bg-black border-color-logo placeholder-white-500 text-white"
										placeholder="Write a short description of the project..."
									></textarea>
								</div>
								<div class="flex flex-col md:ml-8 space-y-4  ">
									<label class="font-bold text-lg text-white ">Reward</label>
									<input
										onChange={(e) => setReward(e.target.value)}
										type="number"
										placeholder="Amount in WorkShare Token"
										className="border rounded-lg py-3 px-3 mt-4 bg-black  border-color-logo placeholder-white-500 text-white"
									></input>
									<label class="font-bold text-lg text-white ">Penalty</label>
									<input
										onChange={(e) => setPenalty(e.target.value)}
										type="number"
										placeholder="Penalty in WorkShare Token"
										className="border rounded-lg py-3 px-3 mt-4 bg-black  border-color-logo placeholder-white-500 text-white"
									></input>
									<label className="font-bold text-lg text-white ">Deadline</label>
									<DatePicker
										className="w-full border rounded-lg py-3 px-3  bg-black  border-color-logo placeholder-white-500 text-white"
										selected={deadline}
										onChange={handleDeadline}
										dateFormat="dd-MM-yyyy"
									/>

									<div class="flex-grow"></div>

									<button
										className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
										routerLink="/projects"
										onClick={createProject}
										disabled={loading}
									>
										{loading ? "Loading..." : "Create Project"}
									</button>
								</div>
							</div>
						</div>
						{isAlertVisible && success && <p className="ml-[60%] text-green-400">Project successfully created</p>}
						{isAlertVisible && error && <p className="ml-[60%] text-red-400">Error see polygon scan</p>}
					</div>
				</div>
			</div>
		</div>
	);
};
