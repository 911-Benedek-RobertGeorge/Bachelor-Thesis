import React from "react";
import ConnectButton from "../components/ConnectWallet";
import { Header } from "./Header";
import { NftCard } from "../components/card/NftCard";
import nft from "../assets/nft-example.png";
import nft2 from "../assets/colorful-nft.png";

import nft3 from "../assets/cool-dev.png";

import nft4 from "../assets/purple-laptop.png";

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
				<div className="flex flex-col text-white snap-start bg-playful-hand-image w-full h-screen bg-cover bg-center   items-center px-4">
					<div className=" w-[60%] relative group">
						<div className="p-10 absolute  -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

						<div className="  flex justify-center items-center  ">
							<div className="w-1/5 h-1/5  m-4">
								<img src={nft3} className="  relative" />
								<figcaption class="mt-2 text-sm text-center text-gray-300 ">Project manager</figcaption>
							</div>
							<div className=" m-4 w-1/5 h-1/5">
								<img src={nft} className="  relative" />
								<figcaption class="mt-2 text-sm text-center text-gray-300  ">Senior developer</figcaption>
							</div>

							<div className="m-4 w-1/5 h-1/5">
								<img src={nft2} className="  relative" />
								<figcaption class="mt-2 text-sm text-center text-gray-300  ">Frontend developer</figcaption>
							</div>
							<div className=" m-4 w-1/5 h-1/5">
								<img src={nft4} className="  relative" />
								<figcaption class="mt-2 text-sm text-center text-gray-300">Junior developer</figcaption>
							</div>
						</div>

						<button className="p-8 relative justify-right px-7 py-4 bg-black rounded-lg leading-none  divide-x divide-gray-600">
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
