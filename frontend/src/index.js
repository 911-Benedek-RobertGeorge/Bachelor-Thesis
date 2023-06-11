import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Web3ReactProvider } from "@web3-react/core";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Carousel, initTE } from "tw-elements";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";
import Project from "./components/Project";
import { CreateProject } from "./pages/CreateProject";
import { MyProjects } from "./pages/MyProjects";
import { MyPage } from "./pages/MyPage";
initTE({ Carousel });
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Web3ReactProvider>
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/project" element={<Project />} />
				<Route path="/project-form" element={<CreateProject />} />
				<Route path="/my-projects" element={<MyProjects />} />
				<Route path="/personal" element={<MyPage />} />

				<Route path="/contact" element={<MyProjects />} />
			</Routes>
		</Router>
	</Web3ReactProvider>
);
