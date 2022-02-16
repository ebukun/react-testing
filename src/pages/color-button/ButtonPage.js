import React, {useState} from "react";

export function replaceCamelWithSpace(colorName) {
	return colorName.replace(/\B([A-Z])\B/g, " $1");
}

const ButtonPage = () => {
	const [color, setColor] = useState("MediumVioletRed");
	const [disabled, setDisabled] = useState(false);
	const newbuttonColor = color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

	// console.log(replaceCamelWithSpace("MediumVioletRed"));

	return (
		<div>
			<button
				onClick={() => {
					setColor(newbuttonColor);
				}}
				style={{backgroundColor: disabled ? "gray" : color}}
				disabled={disabled}
			>
				Change to {replaceCamelWithSpace(newbuttonColor)}
			</button>
			<div>
				<input
					id="disable-checkbox"
					defaultChecked={disabled}
					type="checkbox"
					aria-checked={disabled}
					onChange={(e) => {
						setDisabled(e.target.checked);
					}}
				/>
				<label htmlFor="disable-checkbox">Disable button</label>
			</div>
		</div>
	);
};

export default ButtonPage;
