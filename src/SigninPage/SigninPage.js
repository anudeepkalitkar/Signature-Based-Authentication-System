import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SigninPage.css";
import M from "materialize-css";
import { BackEndLoginURL, PortFolioURL } from "../StaticInformation/UrlLinkInfo";
import MyCanvas from "../MyCanvas/MyCanvas";
const SigninPage = (props) => {
	const [timer, ChangeTimer] = useState(10);
	const [startTimer, SetStartTimer] = useState(false);
	const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const [formData, setFormData] = useState({ });
	const [alertMessage, SetAlertMessage] = useState("");
	const handleChange = (event) => {
		event.preventDefault();
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleClearForm = (event) => {
		event.preventDefault();
		window.location.reload();
	};

	const ShowAlert = (message, nextPage) => {
		if (nextPage) {
			SetStartTimer(true);
		}
		SetAlertMessage(message);
		let modal = document.getElementById("modalAlert");
		let modelInstance = M.Modal.init(modal, {});
		modelInstance.open();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		let email = {
			method: "post",
			contentType: "application/json",
			url: BackEndLoginURL,
			data: formData,
		};
		await axios(email).then(
			(res) => {
				if (res.data.success) {
					ShowAlert("You have been successfully Logged into our systems. Your Similiarity scores are: " + res.data.match , true);
				} else {
					ShowAlert("Password doesn't match please try again. " + res.data.error, false);
				}
			},
			(error) => {
				ShowAlert(error, false);
			}
		);
	};

	useEffect(() => {
		async function TimeLeft() {
			await Sleep(1000);
			if (startTimer) {
				if (timer - 1 === -1) {
					SetStartTimer(false);
					window.location.href = PortFolioURL;
				} else {
					ChangeTimer(timer - 1);
				}
			}
		}
		TimeLeft();
	}, [timer, startTimer]);

	return (
		<div className="row">
			<div className="col s6 lockImage ">
				<div className=" center"></div>
			</div>
			<div className="col s6 application">
				<div className="center">
					<h3 className="heading">Sign In</h3>
					<div className="container">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="input-field col s12 m12">
									<input
										type="text"
										name="Uname"
										id="Uname"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Uname" className="black-text">
										UserName
									</label>
									<span id="_Uname" className="red-text"></span>
								</div>
							</div>
							<MyCanvas formData={formData} setFormData={setFormData}></MyCanvas>

							<div className="row">
								<div className="col s6">
									<button
										className="btn waves-effect waves-light green "
										type="submit"
										id="submit"
										name="submit">
										Submit
										<i className="material-icons right">send</i>
									</button>
								</div>
								<div className="col s6">
									<button
										className="btn waves-effect waves-light red"
										onClick={handleClearForm}>
										Clear Form
										<i className="material-icons right">clear_all</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div id="modalAlert" className="modal open ">
				<div className="modal-content ">
					<h4 className="title-div">
						{alertMessage}
						{startTimer && (
							<h5>
								We will redirect to my other Projects in {timer} seconds. Please do
								check them out!!
							</h5>
						)}
					</h4>
					<button className="modal-close btn">close</button>
				</div>
			</div>
		</div>
	);
};
export default SigninPage;
