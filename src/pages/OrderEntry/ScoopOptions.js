import {
	Box,
	Image,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/react";
import React, {useState} from "react";

const ScoopOptions = ({name, imagePath, updateItemCount}) => {
	const [isValid, setIsValid] = useState(false);
	const updateScoop = (value) => {
		const currentValue = parseFloat(value);
		const valueIsValid =
			0 <= currentValue && currentValue <= 10 && Math.floor(currentValue) === currentValue;
		setIsValid(valueIsValid);

		if (valueIsValid) {
			updateItemCount(name, value);
		}
	};
	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
			<Image
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} scoop`}
				objectFit="cover"
				htmlWidth={"75%"}
			/>

			<h2
				style={{
					fontWeight: "600",
					marginTop: "10px",
				}}
			>
				{name}
			</h2>

			<Box mt="4">
				<NumberInput
					size="lg"
					defaultValue={2}
					max={10}
					min={1}
					inputMode="number"
					onChange={(value) => {
						updateScoop(value);
					}}
					keepWithinRange={false}
					clampValueOnBlur={false}
					pattern={"^[0-9]+$"}
					aria-label={name}
				>
					<NumberInputField type="number" id="input" data-testid="input" />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</Box>
		</Box>
	);
};

export default ScoopOptions;
