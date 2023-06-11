import React, { useState } from "react";

export const ManagerSection = () => {
	const [loading, setLoading] = useState(false);

	const acceptDeveloper = async () => {
		try {
			//call acceptdevfunct
		} catch (error) {}
	};
	return (
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
	);
};
