import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { ProjectInfo } from "../StaticInformation/ProjectInfo";

const HomePage = (props) => {
	let navigate = useNavigate();
	const handleLoginButton = (event) => {
		event.preventDefault();
		navigate("/login");
	};
	const handleSigninButton = (event) => {
		event.preventDefault();
		navigate("/signup");
	};
	return (
		<div className="center">
			<div className="container">
				<h3 className="project-title">{ProjectInfo.title}</h3>
				<h6 className="intro-desc">{ProjectInfo.intro}</h6>
				<div className="row">
					<div className="col s12 m6">
						<button
							className="waves-effect waves-light btn  green "
							onClick={handleLoginButton}>
							Login
						</button>
					</div>
					<div className="col s12 m6">
						<button
							className="waves-effect waves-light btn blue "
							onClick={handleSigninButton}>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default HomePage;
