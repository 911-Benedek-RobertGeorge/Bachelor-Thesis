import React from "react";
import nft from "../assets/nft-example.png";
import nft2 from "../assets/colorful-nft.png";

import nft3 from "../assets/cool-dev.png";

import nft4 from "../assets/purple-laptop.png";

export const NftShowOff = () => {
	return (
		<div className="md:-ml-[50%] md:w-[60%] w-[100%] scale-75 relative group">
			<div className="p-10 absolute  -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

			<div className="  flex justify-center items-center  ">
				<div className="w-1/5 h-1/5  m-4">
					<img src={nft3} className="  relative" />
					<figcaption class="mt-2 text-sm text-center text-gray-300 group-hover:text-cyan-400 group-hover:text-lg">Project manager</figcaption>
				</div>
				<div className=" m-4 w-1/5 h-1/5">
					<img src={nft} className="  relative" />
					<figcaption class="z-11 mt-2 text-sm text-center text-gray-300 group-hover:text-cyan-400 group-hover:text-lg">Senior developer</figcaption>
				</div>

				<div className="m-4 w-1/5 h-1/5">
					<img src={nft2} className="  relative" />
					<figcaption class="mt-2 text-sm text-center text-gray-300 group-hover:text-cyan-400 group-hover:text-lg">UI developer</figcaption>
				</div>
				<div className=" m-4 w-1/5 h-1/5">
					<img src={nft4} className="  relative" />
					<figcaption class="mt-2 text-sm text-center text-gray-300 group-hover:text-cyan-400 group-hover:text-lg">Junior developer</figcaption>
				</div>
			</div>
			<div className="  flex flex-row">
				<button className="ml-8 p-8 relative justify-right px-7 py-4 bg-black rounded-lg leading-none  divide-x divide-gray-600">
					<a className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200" href="/register">
						See how to &rarr;
					</a>
				</button>
				<p className="ml-16 flex justify-center items-center text-extrabold text-2xl text-indigo-400">Earn Skill proof NFTs</p>
			</div>
		</div>
	);
};
