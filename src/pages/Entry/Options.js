import {useEffect, useState} from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import {Container, SimpleGrid} from "@chakra-ui/react";
import AlertBanner from "../../components/AlertBanner";
import {pricePerItem} from "../../constant";
import {useOrderDetails} from "../../context/OrderDetails";

const Options = ({optionType}) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	const [orderDetails, updateItemCount] = useOrderDetails();

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

	if (error) {
		return <AlertBanner />;
	}

	const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
	const title = optionType === "scoops" ? "Scoops" : "Toppings";

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
			updateItemCount={(itemName, itemCount) => updateItemCount(itemName, itemCount, optionType)}
		/>
	));

	return (
		<Container>
			<h2>{title}</h2>
			<p>{pricePerItem[optionType]} each</p>
			<p>
				{title} total {orderDetails.totals[optionType]}
			</p>
			<div>{optionItems}</div>
		</Container>
	);
};

export default Options;
