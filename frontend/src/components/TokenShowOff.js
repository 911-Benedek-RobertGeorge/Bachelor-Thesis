import React, { useEffect } from "react";

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import logo from "../assets/logo2.png";

export const TokenShowOff = () => {
	const handVariants = {
		visible: { transition: { duration: 2.5 }, x: +450, y: -400 },
		hidden: { opacity: 1, scale: 1.25 },
	};
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<motion.div ref={ref} animate={controls} initial="hidden" variants={handVariants} className="w-[30%]  relative group ">
			<div className=" flex flex-col justify-center items-center ">
				<div className="w-1/5 h-1/5 m-4">
					<img src={logo} className="relative" />
				</div>
				<p class="text-sm text-center text-gray-300 group-hover:text-color-logo">
					WorkShare Token, <br></br> the new currency to reward hard work
				</p>
			</div>
		</motion.div>
	);
};
