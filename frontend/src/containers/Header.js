import React, { useState } from "react";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { MenuItems } from "../components/MenuItems";
import { RiMenu3Line } from "react-icons/ri";
import Typed from "react-typed";

export const Header = () => {
	const [active, setActive] = useState(false);
	const showMenu = () => {
		setActive(!active);
	};
	return (
		<div className="select-none flex w-full p-2 text-color-logo   justify-between mt-[-3%] items-center ">
			<div className="h-48 select-none flex flex-col items-center  md:scale-50  sm:scale-50 text-center text-white font-extrabold">
				<img src={logo} alt="logo" className="" />
				<h1 className="md:text-5xl sm:text-4xl">WorkShare</h1>
				<Typed className="" strings={["Performance based rewards", "Proof of Skill NFTs"]} loop typeSpeed={120} backSpeed={140} />
			</div>
			<nav className=" opacity-75 hover:opacity-100">
				<div className="flex items-center right-24 top-16 md:hidden scale-[2.5]">
					<RiMenu3Line onClick={showMenu} className="sm:scale-75 m-12 cursor-pointer" />
				</div>
				<ul className="hidden md:flex gap-8 p-6 uppercase font-bold  ">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/projects">Projects</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
				</ul>
				<MenuItems showMenu={showMenu} active={active} />
			</nav>
		</div>
	);
};
