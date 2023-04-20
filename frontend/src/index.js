import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ConnectButton from "./components/ConnectWallet";
import { Navbar } from "./containers/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Section } from "./components/Section";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
		</Routes>
	</Router>
);
