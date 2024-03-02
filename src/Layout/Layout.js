import React from "react";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import "./Layout.css";
import { ProjectInfo } from "../StaticInformation/ProjectInfo";
// import { linkedinUrl, githubUrl, gmailUrl, instagramUrl } from "../StaticInformation/UrlLinkInfo";
const Layout = (props) => {
	const { PassedComponent } = props;
	return (
		<>
			{isMobile && (
				<div className="container">
					<PassedComponent />
				</div>
			)}
			{isTablet && (
				<div className="container">
					<PassedComponent />
				</div>
			)}

			{isBrowser && (
				<div className="row">
					<div className="col s12 m6 scrollable">
						<PassedComponent />
					</div>
					<div className="col s12 m6 backgound nonscrollable"></div>

				</div>
				
			)}

		</>
	);
};

export default Layout;
