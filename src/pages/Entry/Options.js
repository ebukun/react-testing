import {useEffect, useState} from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import {Container, SimpleGrid, Text} from "@chakra-ui/react";
import AlertBanner from "../../components/AlertBanner";

const Options = ({optionType}) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	const getScoop = async () => {
		try {
			const result = await axios.get(`https://localhost:3030/${optionType}`);
			setItems(result.data);
		} catch (error) {
			setError(true);
		}
	};

	useEffect(() => {
		getScoop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionType]);

	const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

	if (error) {
		return <AlertBanner />;
	}

	return (
		<Container>
			<div>
				<Text fontSize="50px" color="tomato">
					{optionType === "scoops" ? "Scooping" : "Toppings"}
				</Text>
				<SimpleGrid columns={3} spacing={10}>
					{items.map((item) => (
						<ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
					))}
				</SimpleGrid>
			</div>
		</Container>
	);
};

export default Options;
