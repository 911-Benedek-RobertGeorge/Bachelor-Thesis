import React from "react";
import "./GetMail.css";

export const GetMail = () => {
	return (
		<div className="flex gap-4">
			<label for="email">Enter your email:</label>
			<input type="email" id="email" name="email" className="rounded-3xl  text-center font-semibold" />
			<button className="button z-10">Submit</button>
		</div>
	);
};
