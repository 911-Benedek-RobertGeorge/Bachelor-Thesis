import React from "react";
import ConnectButton from "../components/ConnectWallet";
import { Header } from "./Header";
import { NftShowOff } from "../components/NftShowOff";

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
					<h1>BENEFICII E PLATIT MAI BN NFTS SI EXEMPLE DE NFT, THE TOKEN</h1>
					<div className="the token ">
						<img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
					</div>
				</div>
			</div>
		</div>
	);
};
