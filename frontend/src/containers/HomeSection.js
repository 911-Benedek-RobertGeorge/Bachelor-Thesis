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
				<div className="text-white font-sans  grid  grid-cols-8 grid-rows-4 gap-4 text-white snap-start bg-hands-image w-full h-screen bg-cover bg-center flex items-center px-4">
					<div className="col-span-2  row-span-2 place-self-end  ">
						Are you facing difficulties finding the right talent locally to meet your company's evolving needs? <br></br>
					</div>
					<div className="col-span-2 row-span-2  ">
						Are you concerned about the high costs and complexities associated with traditional recruitment processes?
					</div>
					<div className="row-span-2"></div>
					<div className="col-span-3 row-span-2">
						Do you want to collaborate with innovative companies and have access to a diverse range of projects that match your interests and
						abilities?
					</div>
					<div className="col-span-2"></div>
					<div className="col-span-4  ">
						<h2 className="text-center">Spoiler alert!</h2>
						<h5 className="text-center">(Hover to reveal)</h5>
						<p className="spoiler  ">
							WorkShare is the innovative solution that brings companies and developers together to address the challenges faced in talent acquisition
							and project management. By providing a global talent pool, WorkShare enables companies to access a diverse range of skills and
							expertise, overcoming the limitations of local talent availability. For developers, WorkShare offers a platform to showcase their
							skills, connect with global opportunities, and maximize their income potential.
						</p>
					</div>
					<div className="col-span-3 ">
						Do you require specialized skills and expertise that may not be readily available within your immediate vicinity?
					</div>
					<div className="col-span-2"></div>
					<div className="col-span-3 place-self-start">Do you want to maximize your income potential and reduce your tax obligations </div>
				</div>
				<div className="flex flex-col justify-bottom text-white snap-start bg-playful-hand-image w-full h-screen bg-cover bg-bottom   items-center px-4">
					<NftShowOff />
					<TokenShowOff />
				</div>
			</div>
		</div>
	);
};
