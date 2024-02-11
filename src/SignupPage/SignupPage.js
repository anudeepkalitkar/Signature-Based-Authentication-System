import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupPage.css";
import M from "materialize-css";
import { BackEndSignupURL } from "../StaticInformation/UrlLinkInfo";
import { useNavigate } from "react-router-dom";
import MyCanvas from "../MyCanvas/MyCanvas";
const SignupPage = (props) => {
	let navigate = useNavigate();
	const [alertMessage, SetAlertMessage] = useState(false);
	const [timer, ChangeTimer] = useState(10);
	const [startTimer, SetStartTimer] = useState(false);
	const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const [formData, setFormData] = useState({ Password: "" });

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
		let email = {
			method: "post",
			contentType: "application/json",
			url: BackEndSignupURL,
			data: formData,
		};
		await axios(email).then(
			(res) => {
				if (res.data.success) {
					ShowAlert(
						"You have been successfully registered into our systems. Its time to check your password by logging into our system.",
						true
					);
				} else {
					ShowAlert(res.data.error, false);
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
					navigate("/login");
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
					<h3 className="heading">Sign up</h3>
					<div className="container">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="input-field col s12 m6">
									<input
										type="text"
										name="Fname"
										id="Fname"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Fname" className="black-text">
										First Name
									</label>
									<span id="_Fname" className="red-text"></span>
								</div>
								<div className="input-field col s12 m6">
									<input
										type="text"
										name="Lname"
										id="Lname"
										required
										onChange={handleChange}
									/>

									<label htmlFor="Lname" className="black-text">
										Last Name
									</label>
									<span id="_Lname" className="red-text"></span>
								</div>

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
								<div className="input-field  col s12 ">
									<input
										type="email"
										name="Email"
										id="Email"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Email" className="black-text">
										Email
									</label>
									<span id="_Email" className="red-text"></span>
								</div>
								<div className="input-field  col s12 m12">
									<input
										type="text"
										name="Phno"
										id="Phno"
										onChange={handleChange}
									/>
									<label htmlFor="phno" className="black-text">
										Phone Number (Optional)
									</label>
								</div>
							</div>
							<MyCanvas></MyCanvas>
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

			<div id="modalAlert" className="modal open">
				<div className="modal-content">
					<h4 className="title-div">{alertMessage}</h4>
					{startTimer && <h5>We will redirect you to Login Page in {timer} seconds</h5>}
					<button className="modal-close btn">close</button>
				</div>
			</div>
		</div>
	);
};
export default SignupPage;
