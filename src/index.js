import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import M from "materialize-css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
	document.addEventListener("DOMContentLoaded", function () {
		M.AutoInit();
	})
);

reportWebVitals();
