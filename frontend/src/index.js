import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Carousel, initTE } from "tw-elements";
initTE({ Carousel });
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	</Router>
);
