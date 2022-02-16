import React, {useState} from "react";

const ButtonPage = () => {
	const [color, setColor] = useState("red");
	const [disabled, setDisabled] = useState(false);
	const newbuttonColor = color === "red" ? "blue" : "red";

	return (
		<div>
			<button
				onClick={() => {
					setColor(newbuttonColor);
				}}
				style={{backgroundColor: color}}
				disabled={disabled}
			>
				Change to {newbuttonColor}
			</button>
			<div>
				<input
					id="disable-checkbox"
					defaultChecked={disabled}
					type="checkbox"
					aria-checked={disabled}
					onChange={(e) => setDisabled(e.target.checked)}
				/>
				<label htmlFor="disable-checkbox">Disable button</label>
			</div>
		</div>
	);
};

export default ButtonPage;
