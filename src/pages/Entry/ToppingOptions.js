import {Box, Image} from "@chakra-ui/react";
import React from "react";

const ToppingOptions = ({name, imagePath}) => {
	return (
		<Box>
			<Image
				src={`https://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
				objectFit="cover"
				htmlWidth={"75%"}
			/>
		</Box>
	);
};

export default ToppingOptions;
