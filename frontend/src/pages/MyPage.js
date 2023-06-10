import React, { useState } from "react";
import { Header } from "../containers/Header";

export const MyPage = () => {
	const [admin, setAdmin] = useState(false);
	const [manager, setManager] = useState(false);
	const [developer, setDeveloper] = useState(false);

	const [loading, setLoading] = useState(false);

	const acceptDeveloper = async () => {
		try {
			//call acceptdevfunct
		} catch (error) {}
	};
	const getRole = async () => {
		try {
			setManager(true);
		} catch (error) {}
	};
	return (
		<div className=" flex flex-col bg-gradient-to-b from-color-bg to-footer-color h-screen items-center space-y-8 ">
			<Header />
			<div className="admin flex flex-col items-center space-y-4">
				<label class="font-bold text-lg text-white  ">Grant Manager Role</label>
				<input
					type="text"
					placeholder="Address"
					class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
				></input>

				<button
					className=" border border-indigo-600 bg-black text-white rounded-lg p-3 font-semibold"
					routerLink="/projects"
					onClick={acceptDeveloper}
					disabled={loading}
				>
					{loading ? "Loading..." : "Make manager"}
				</button>
			</div>
			<div className=" flex space-x-8">
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white ">Accept Developer</label>
					<input
						type="text"
						placeholder="Address"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<input
						type="number"
						placeholder="projectNumber"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={acceptDeveloper}
						disabled={loading}
					>
						{loading ? "Loading..." : "Accept developer"}
					</button>
				</div>
				<div className="flex flex-col space-y-4">
					<label class="font-bold text-lg text-white">Finalize project</label>
					<input
						type="number"
						placeholder="Project number"
						class="border rounded-lg py-3 px-3  bg-black border-color-logo placeholder-white-500 text-white"
					></input>
					<button
						className="w-1/2 mx-auto mt-auto flex justify-center  border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
						routerLink="/projects"
						onClick={acceptDeveloper}
						disabled={loading}
					>
						{loading ? "Loading..." : "Finalize"}
					</button>
					<div className="flex flex-span"></div>
				</div>
			</div>
			<div className="My projects"> </div>
		</div>
	);
};
