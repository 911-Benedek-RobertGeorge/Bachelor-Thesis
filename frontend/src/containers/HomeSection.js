import React from "react";
import ConnectButton from "../components/ConnectWallet";
import { Header } from "./Header";
import { NftShowOff } from "../components/NftShowOff";
import logo from "../assets/logo2.png";
import { TokenShowOff } from "../components/TokenShowOff";
///https://codepen.io/32teeth/pen/QvyxKZ nfts

export const HomeSection = () => {
	return (
		<div>
			{" "}
			<div className="place-self start snap-y scroll-smooth  snap-mandatory h-screen w-screen overflow-scroll">
				<div className=" select-none snap-start  flex flex-col items-center bg-home-image w-full h-screen bg-cover bg-bottom flex items-center px-4">
					<Header />
					<ConnectButton />
				</div>{" "}
				<div className=" text-white snap-start bg-hands-image w-full h-screen bg-cover bg-center flex items-center px-4">
					Bring the managers and developers toghether , the people that need projects done with dev
				</div>
				<div className="flex flex-col justify-bottom text-white snap-start bg-playful-hand-image w-full h-screen bg-cover bg-bottom   items-center px-4">
					<NftShowOff />
					<TokenShowOff />
				</div>
			</div>
		</div>
	);
};
