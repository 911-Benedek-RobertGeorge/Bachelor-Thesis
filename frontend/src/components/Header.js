import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export const Header = () => {
	const [active, setActive] = useState(false);
	const showMenu = () => {
		setActive(!active);
	};
	return (
		<div className="fixed w-full text-[#9D45BF] flex justify-between p-4 items-center">
			<div className="  text-center text-white font-extrabold">
				<img src={logo} alt="logo" className="logo flex justify-right" />
				<h1 className="text-4xl ">WorkShare</h1>
				<p>Perfomance based rewards</p>
			</div>
			<nav className=" opacity-75 hover:opacity-100">
				<div className="absolute right-24 top-16 md:hidden scale-[2.5]">
					<RiMenu3Line onClick={showMenu} className="cursor-pointer" />
				</div>
				<ul className="hidden md:flex gap-8 p-6 uppercase font-bold  ">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/">Projects</Link>
					</li>
					<li>
						<Link to="/">Register</Link>
					</li>
					<li>
						<Link to="/">Contact</Link>
					</li>
				</ul>
				<MenuItems showMenu={showMenu} active={active} />
			</nav>
		</div>
	);
};
