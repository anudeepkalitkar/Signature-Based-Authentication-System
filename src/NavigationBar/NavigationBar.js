import React, { useEffect } from "react";
import "./NavigationBar.css";
import M from "materialize-css";
import { ResumePath } from "../StaticInformation/AboutMeInfo";
import { DisplayImage } from "../StaticInformation/ImagesInfo";
import "../Layout/Layout.css";
import { PortFolioURL } from "../StaticInformation/UrlLinkInfo";
const NavigationBar = (props) => {
	useEffect(() => {
		let sidenav = document.querySelector(".sidenav");
		M.Sidenav.init(sidenav, {});
	}, []);
	const HandleSideNavClose = (event) => {
		let sidenav = document.querySelector(".sidenav");
		let instance = M.Sidenav.getInstance(sidenav, {});
		instance.close();
	};
	return (
		<div>
			<nav className="navbar z-depth-5">
				<div className="navbar-fixed nav-wrapper">
					<a href="#!" data-target="mobile-nav" className="sidenav-trigger">
						<i className="material-icons">menu</i>
					</a>
					<ul className="hide-on-med-and-down right">
						<li>
							<a
								className="waves-effect waves-light btn green"
								href={PortFolioURL}
								rel="noreferrer">
								PortFolio
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<ul className="sidenav" id="mobile-nav">
				<li>
					<div className="container nav-item">
						<div className="center">
							<img className="hero" src={DisplayImage} alt="Me" />
						</div>
						<h5 className="name">Anudeep Kalitkar</h5>
						<h6 className="job-title">Master's Student</h6>
					</div>
				</li>
				<li>
					<a
						className="waves-effect waves-light btn green"
						href={PortFolioURL}
						rel="noreferrer">
						PortFolio
					</a>
				</li>
			</ul>
		</div>
	);
};

export default NavigationBar;
