import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import { HashRouter } from 'react-router-dom';

function App() {
	return (
		<>
		<HashRouter>
			<Routes>
				<Route path="/" element={<HomePage  />} />
				<Route path="/login" element={<SigninPage  />} />
				<Route path="/signup" element={<SignupPage  />} />
			
			</Routes>

		</HashRouter>
		</>
	);
}

export default App;
