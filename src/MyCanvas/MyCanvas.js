import React, { useState, useEffect, useRef } from "react";

const MyCanvas = (props) => {
	const {formData, setFormData } = props;
	const canvasRef = useRef(null);
	const [isPainting, SetIsPainting] = useState(false);
	const [strokeColor, SetStrokeColor] = useState("#000000");
	const [points, SetPoints] = useState([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.fillRect(0, 0, canvas.width, canvas.height);

		const redraw = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = "white";
			context.fillRect(0, 0, canvas.width, canvas.height);

			context.strokeStyle = strokeColor;
			context.lineJoin = "round";
			context.lineWidth = 4;

			for (let i = 0; i < points.length; i++) {
				context.beginPath();
				if (points[i].dragging && i) {
					context.moveTo(points[i - 1].x, points[i - 1].y);
				} else {
					context.moveTo(points[i].x - 1, points[i].y);
				}
				context.lineTo(points[i].x, points[i].y);
				context.closePath();
				context.stroke();
			}
		};

		redraw();
	}, [points, strokeColor]);

	const handleMouseDown = (e) => {
		const mouseX = e.pageX - canvasRef.current.offsetLeft;
		const mouseY = e.pageY - canvasRef.current.offsetTop;
		SetIsPainting(true);
		addPoint(mouseX, mouseY, false);
	};

	const handleMouseMove = (e) => {
		if (isPainting) {
			const mouseX = e.pageX - canvasRef.current.offsetLeft;
			const mouseY = e.pageY - canvasRef.current.offsetTop;
			addPoint(mouseX, mouseY, true);
		}
	};

	const handleMouseUp = () => {
		SetIsPainting(false);
		const canvas = canvasRef.current;
		const imageData = canvas.toDataURL("image/png");
		setFormData({
			...formData,
			'passwordImg': imageData
		});
	};

	const addPoint = (x, y, dragging) => {
		SetPoints((points) => [...points, { x, y, dragging }]);
	};

	const clearArea = (event) => {
		event.preventDefault();

		SetPoints([]);
	};

	return (
		<div>
			<div className="container center">
                <h4 className="heading">Sign your password</h4>
				<canvas
					ref={canvasRef}
					id="myCanvas"
					className="signboard responsive-img white"
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}></canvas>
			</div>
			<div className="row center">
				<div className="col s6">
					<button onClick={clearArea} className="btn waves-effect waves-light brown">
						Clear
					</button>
				</div>

				<div className="input-field  col s6">
					<input
						type="color"
						name="color"
						value={strokeColor}
						onChange={(e) => SetStrokeColor(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default MyCanvas;
