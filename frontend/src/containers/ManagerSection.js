import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContract, getAccount, checkIfAddress } from "../utils/contractHelpers";
import { ApplicantsList } from "../components/ApplicantsList";

export const ManagerSection = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const [contract, setContract] = useState();
	const [account, setAccount] = useState();

	const [error, setError] = useState("");
	const [projectNumber, setProjectNumber] = useState(-1);

	const [applicantAddress, setApplicantAddress] = useState("");
	const [projectNumberFinalize, setprojectNumberFinalize] = useState(-1);
	const [developerAddress, setDeveloperAddress] = useState("");
	const [email, setEmail] = useState("");
	const [txHash, setTxHash] = useState("");
	const [applicantsList, setApplicantsList] = useState([]);
	const [effort, setEffort] = useState(false);

	const handleChange = (event) => {
		setEffort(!event.target.checked);
	};
	useEffect(() => {
		const fetchRole = async () => {
			setContract(await getContract());
			setAccount(await getAccount());
		};
		fetchRole();
	}, []);

	const acceptDeveloper = async () => {
		try {
			setLoading(true);
			setError(false);

			setSuccess(false);
			if (!(await checkIfAddress(applicantAddress))) {
				setError("Invalid Address!");
			} else {
				setError("");
				await contract.methods.acceptApplication(projectNumber, applicantAddress).send({ from: account });
				setSuccess(true);
			}
		} catch (error) {
			setError(error);
			console.log(error);
		}
		setLoading(false);
	};

	const finalizeProject = async () => {
		setSuccess(false);
		setError(false);

		setLoading(true);
		try {
			const tx = await contract.methods.finalizeProject(projectNumberFinalize).send({ from: account });

			setTxHash(tx.hash);
			await tx.wait();
			setSuccess(true);
		} catch (error) {
			setError(error);
			console.log(error);
		}
		setLoading(false);
	};

	const projectNotCompleted = async () => {
		setSuccess(false);
		setError(false);
		setLoading(true);
		try {
			const tx = await contract.methods.projectNotCompleted(projectNumberFinalize, effort).send({ from: account });
			setTxHash(tx.hash);
			await tx.wait();
			setSuccess(true);
		} catch (error) {
			setError(error);
			console.log(error);
		}
		setLoading(false);
	};

	const getEmailOfAddress = async () => {
		setSuccess(false);
		setError(false);
		setLoading(true);
		try {
			const emaill = await contract.methods.getEmailOfDeveloper(developerAddress).call({ from: account });

			setEmail(emaill);
			setSuccess(true);
		} catch (error) {
			setError(error);
			console.log(error);
		}
		setLoading(false);
	};

	const getApplicants = async () => {
		setSuccess(false);
		setError(false);
		setLoading(true);
		try {
			const theApplicantsList = await contract.methods.getAllApplicants(projectNumber).call({ from: account });

			setApplicantsList(theApplicantsList);
			setSuccess(true);
		} catch (error) {
			setError(error);
			console.log(error);
		}
		setLoading(false);
	};
	return (
		<div className="flex flex-col">
			<div className="">
				{success && <p className="text-green-400">Successfully </p>}
				{error && <p className="text-red-600">Error : Something went wrong, check on polyscan</p>}
				{txHash && <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}> here</a>}
			</div>
			<div className=" flex space-x-8">
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white ">Get applicants</label>
					<input
						type="number"
						onChange={(e) => setProjectNumber(e.target.value)}
						placeholder="Project number"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>

					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={getApplicants}
						disabled={loading}
					>
						{loading ? "Loading..." : "Get  "}
					</button>
				</div>
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white ">Get developer's email</label>
					<input
						type="text"
						onChange={(e) => setDeveloperAddress(e.target.value)}
						placeholder="Address"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>

					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={getEmailOfAddress}
						disabled={loading}
					>
						{loading ? "Loading..." : "Get email"}
					</button>
					{email && <p className="text-white">{email}</p>}
				</div>
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white ">Accept Developer</label>

					<input
						type="text"
						onChange={(e) => setApplicantAddress(e.target.value)}
						placeholder="Address"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<input
						type="number"
						onChange={(e) => setProjectNumber(e.target.value)}
						placeholder="Project number"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>

					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={acceptDeveloper}
						disabled={loading}
					>
						{loading ? "Loading..." : "Accept "}
					</button>
				</div>

				<div>
					<Link to="project-form">
						<button
							type="button"
							className=" h-12 w-32 text-color-logo border  border-indigo-600 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
						>
							<span className="font-bold">Add project</span>
							<svg aria-hidden="true" className="scale-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</Link>
				</div>
			</div>
			<div className="flex mt-8">
				{applicantsList && <ApplicantsList applicantsList={applicantsList} />}
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white">Finalize project</label>
					<input
						type="number"
						onChange={(e) => setprojectNumberFinalize(e.target.value)}
						placeholder="Project number"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={finalizeProject}
						disabled={loading}
					>
						{loading ? "Loading..." : "Finalize"}
					</button>
				</div>
				<div className="flex flex-col space-x-4 space-y-4 max-w-xs">
					<label class="font-bold text-lg text-white">Uncompleted project</label>
					<input
						type="number"
						onChange={(e) => setprojectNumberFinalize(e.target.value)}
						placeholder="Project number"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<div className="flex space-x-4">
						<label for="effort" className="text-white">
							Give 20% of reward for effort
						</label>
						<input type="checkbox" name="effort" onChange={handleChange} />

						<button
							className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
							routerLink="/projects"
							onClick={projectNotCompleted}
							disabled={loading}
						>
							{loading ? "Loading..." : "Incomplete"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
