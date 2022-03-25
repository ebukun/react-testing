import {
	Box,
	Image,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

const ScoopOptions = ({name, imagePath, updateItemCount}) => {
	const updateScoop = (value) => {
		updateItemCount(name, value);
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
					defaultValue={0}
					max={10}
					min={0}
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
