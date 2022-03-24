import {Box, Image, Checkbox} from "@chakra-ui/react";
import React, {useState} from "react";

const ToppingOptions = ({name, imagePath, updateItemCount}) => {
	const [tcchecked, setTcChecked] = useState(false);

	const handleChecked = (e) => {
		setTcChecked(e.target.checked);
		updateItemCount(name, e.target.checked ? 1 : 0);
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
			<Image
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
				objectFit="cover"
				htmlWidth={"75%"}
			/>
			<Box mt="4">
				<Checkbox
					isChecked={tcchecked}
					name={`${name} topping`}
					type="checkbox"
					onChange={handleChecked}
				>
					<span
						style={{
							fontWeight: "600",
							marginTop: "10px",
						}}
					>
						{name} topping
					</span>
				</Checkbox>
			</Box>
		</Box>
	);
};

export default ToppingOptions;
