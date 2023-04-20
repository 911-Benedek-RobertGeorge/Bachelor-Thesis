import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const MenuItems = ({ showMenu, active }) => {
	return (
		<ul
			className={
				active
					? "md:hidden flex-col flex items-center fixed inset-0 left-2/4  justify-center gap-4 p-6 uppercase font-bold bg-black/40 blackdrop-blur-lg"
					: "hidden"
			}
		>
			<RiCloseLine onClick={showMenu} className="scale-150" />
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
	);
};
