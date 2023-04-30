import React from "react";
import ConnectButton from "./ConnectWallet";
import { Header } from "./Header";
import { NftCard } from "./card/NftCard";
import nft from "../assets/nft-example.png";
import nft2 from "../assets/colorful-nft.png";

import nft3 from "../assets/cool-dev.png";

import nft4 from "../assets/purple-laptop.png";

export const Section = () => {
	return (
		<div>
			{" "}
			<div className="place-self start snap-y scroll-smooth  snap-mandatory h-screen w-screen overflow-scroll">
				<div className=" select-none snap-start  flex flex-col items-center bg-home-image w-full h-screen bg-cover bg-center flex items-center px-4">
					<Header />
					<ConnectButton />
				</div>{" "}
				<div className=" text-white snap-start bg-hands-image w-full h-screen bg-cover bg-center flex items-center px-4">
					Bring the managers and developers toghether , the people that need projects done with dev
				</div>
				<div className="flex flex-col text-white snap-start bg-playful-hand-image w-full h-screen bg-cover bg-center   items-center px-4">
					<div className="relative group">
						<div className="p-10 absolute  -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
						<h1>maybe add ranks beginner - experienced </h1>

						<div className="  flex justify-center items-center  ">
							<img src={nft} className="m-4 w-[20%] h-[20%]  relative" />
							<img src={nft2} className="m-4 w-[20%] h-[20%]  relative" />
							<img src={nft3} className="m-4 w-[20%] h-[20%]  relative" />
							<img src={nft4} className="m-4 w-[20%] h-[20%]  relative" />
						</div>

						<button className="relative justify-right px-7 py-4 bg-black rounded-lg leading-none  items-center divide-x divide-gray-600">
							<span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">See what's new &rarr;</span>
						</button>
					</div>
					<h1>BENEFICII E PLATIT MAI BN NFTS SI EXEMPLE DE NFT, THE TOKEN</h1>
					<div className="the token ">
						<img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
					</div>
				</div>
			</div>
		</div>
	);
};
