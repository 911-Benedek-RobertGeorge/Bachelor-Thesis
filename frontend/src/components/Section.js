import React from "react";
import ConnectButton from "./ConnectWallet";

export const Section = () => {
	return (
		<div className="snap-y scroll-smooth  snap-mandatory h-screen w-screen overflow-scroll">
			<div className="snap-start  flex flex-col items-center bg-home-image w-full h-screen bg-cover bg-center flex items-center px-4">
				<ConnectButton className="color-blue " />
			</div>{" "}
			Bring the managers and developers toghether , the people that need projects done with dev
			<div className=" text-white snap-start bg-playful-hand-image w-full h-screen bg-cover bg-center flex items-center px-4">
				<h1>BENEFICII E PLATIT MAI BN NFTS SI EXEMPLE DE NFT, THE TOKEN</h1>
				<button className=" ">something</button>
			</div>
		</div>
	);
};
