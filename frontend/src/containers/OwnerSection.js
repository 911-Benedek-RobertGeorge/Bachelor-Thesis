import React, { useState } from "react";

export const OwnerSection = () => {
	const [loading, setLoading] = useState(false);

	const acceptDeveloper = async () => {
		try {
			//call acceptdevfunct
		} catch (error) {}
	};
	return (
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
	);
};
