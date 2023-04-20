import React from "react";
import ConnectButton from "../components/ConnectWallet";
import logo from "../assets/logo.png";
import wave from "../assets/wave.svg";

export const Navbar = () => {
	return (
		<div className="flex w-screen h-28   bg-color-bg">
			<img src={wave} alt="logo" className="z-0 absolute w-full  "></img>

			<img src={logo} alt="logo" className=" z-10 p-1 h-full  "></img>
		</div>
	);
};
