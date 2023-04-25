import React from "react";
import { Header } from "../components/Header";
import { Animate, initTE } from "tw-elements";
import { GetMail } from "../containers/getMail/GetMail";
import web3Img from "../assets/web3-no-background.png";
import { NftCard } from "../components/card/NftCard";
initTE({ Animate });

function validate(email) {
	const errors = {};

	if (!email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = "Invalid email address";
	}
	console.log(errors);
	return errors;
}

export const Register = () => {
	return (
		<div className="bg-black h-screen w-full flex flex-col items-center  ">
			<Header />
			<div className="mt-64   w-full  h-full   grid gap-4 grid-cols-1 md:grid-cols-5  grid-rows-4 place-items-center">
				<img src={web3Img} alt="web3" className=" row-span-2 col-span-3 "></img>
				<div className="md:mt-32 md:p-10 flex flex-col items-center  font-extrabold text-gradient col-span-2 row-span-2   ">
					<h1 className="text-3xl  ">Start your journey </h1>
					<h3 className="text-xl ">Test your skills in a challenging environment</h3>
					<h3 className="text-3xl"> No employer, just projects!</h3>
					<p>Get paid after each project completion</p>
					<h3>Get Rewards. Get NFTs to prove your skills</h3>
				</div>
				<div className="text-gradient flex flex-col col-span-1 items-center font-extrabold">
					<h1 className="text-3xl">CRYPTO PAYMENTS IN NATIVE COIN, e in functie de eth</h1>
				</div>
				<div>empty</div>
				<div className="p-10 col-span-3 ">
					<GetMail />
				</div>
			</div>
			<NftCard />
		</div>
	);
};
