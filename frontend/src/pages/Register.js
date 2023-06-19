import React from "react";
import { Header } from "../containers/Header";
import { GetMail } from "../containers/getMail/GetMail";
import web3Img from "../assets/web3-no-background.png";

export const Register = () => {
	return (
		<div className=" bg-gradient-to-b from-color-bg to-footer-color w-full flex flex-col items-center  ">
			<Header className="" />
			<div className="gap-4 grid grid-cols-1 md:grid-cols-5  md:grid-rows-4 place-items-center">
				<img src={web3Img} alt="web3" className="flex md:row-span-2 md:col-span-3 scale-50 md:scale-100"></img>
				<div className=" place-self-start flex flex-col items-center  font-extrabold text-gradient  md:col-span-2  md:row-span-2   ">
					<h1 className="text-3xl  ">Start your journey </h1>
					<h3 className="text-xl ">Test your skills in a challenging environment</h3>
					<h3 className="text-3xl"> No employer, just projects!</h3>
					<p>Get paid after each project completion</p>
					<h3>Get Rewards. Get NFTs to prove your skills</h3>
				</div>
				<div className="text-color-text text-gradient flex place-self-start mx-20   md:col-span-2   font-extrabold">
					<h1 className="text-3xl">Get started! Earn Work Share Token! </h1>
				</div>

				<div className=" place-self-start flex p-10  md:col-span-3 ">
					<GetMail />
				</div>
			</div>
		</div>
	);
};
