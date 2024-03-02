import "./App.css";
import React from "react";
import Layout from "./Layout/Layout";
import Footer from "./Footer/Footer";
import HomePage from "./HomePage/HomePage";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import NavigationBar from "./NavigationBar/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";

function App() {
	return (
		<>
			<HashRouter>
				<NavigationBar></NavigationBar>

				<Routes>
					<Route path="/" element={<Layout PassedComponent={HomePage} />} />
					<Route path="/login" element={<Layout PassedComponent={SigninPage} />} />
					<Route path="/signup" element={<Layout PassedComponent={SignupPage} />} />
				</Routes>

				<Footer></Footer>
			</HashRouter>
		</>
	);
}

export default App;
