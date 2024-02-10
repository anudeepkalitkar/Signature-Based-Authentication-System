import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SigninPage.css";
import M from "materialize-css";
import { BackEndLoginURL, PortFolioURL } from "../StaticInformation/UrlLinkInfo";

const SigninPage = (props) => {
	const [timer, ChangeTimer] = useState(10);
	const [startTimer, SetStartTimer] = useState(false);
	const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const [formData, setFormData] = useState({ Password: "" });
	const [randNumbers, SetRandNumbers] = useState([]);
	const [alertMessage, SetAlertMessage] = useState("");
	const generateRandomNumbers = () => {
		const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
		}
		return numbers;
	};

	const generateImageGrid = () => {
		const source = "Images/icons/";
		let table = [];
		const gridSize = 10;
		let count = 0;
		for (let i = 0; i < gridSize; i++) {
			let row = [];
			for (let k = 0; k < gridSize; k++) {
				row.push(
					<td key={k}>
						<img
							id={"image-" + randNumbers[count]}
							className="responsive-img"
							src={`${source}${randNumbers[count]}.jpg`}
							alt={`Icon ${count}`}
							onClick={handleClickImage}
						/>
					</td>
				);
				count += 1;
			}
			table.push(<tr key={i}>{row}</tr>);
		}

		return (
			<table className="centered">
				<tbody>{table}</tbody>
			</table>
		);
	};

	const handleClickImage = (event) => {
		event.preventDefault();
		let labelClass = document.getElementById("Password_label");
		if (!labelClass.className.includes("active")) {
			labelClass.className = labelClass.className + " active";
		}

		setFormData({
			...formData,
			["Password"]: formData["Password"] + ";" + event.target.id,
		});
	};
	const handleChange = (event) => {
		event.preventDefault();

		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleClearPassword = (event) => {
		event.preventDefault();
		let labelClass = document.getElementById("Password_label");
		if (labelClass.className.includes("active")) {
			labelClass.className = "black-text";
		}
		setFormData({
			...formData,
			["Password"]: "",
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
			url: BackEndLoginURL,
			data: formData,
		};
		await axios(email).then(
			(res) => {
				if (res.data.success) {
					ShowAlert("You have been successfully Logged into our systems.", true);
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
		SetRandNumbers(generateRandomNumbers());
	}, []);

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
							<div className="row">
								<div className="input-field col s12 m10">
									<input
										type="Password"
										name="Password"
										id="Password"
										readOnly
										required
										value={formData["Password"]}
									/>
									<label
										htmlFor="Password"
										id="Password_label"
										className="black-text">
										Choose your Password Images form right
									</label>
									<span id="_Password" className="red-text"></span>
								</div>
								<div className="input-field  col s12 m2">
									<button
										className="waves-effect waves-light btn "
										onClick={handleClearPassword}>
										clear
									</button>
								</div>
							</div>
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
			<div className="col s6 lockImage ">
				<div className=" center">
					<h4 className="orange-text heading">
						Select images in a sequence, which will be your Password
					</h4>
					<div className=" container">{generateImageGrid()}</div>
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
