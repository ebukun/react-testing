import {useEffect, useState} from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import {Heading, SimpleGrid, Text} from "@chakra-ui/react";
import AlertBanner from "../../components/AlertBanner";
import {pricePerItem} from "../../constant";
import {useOrderDetails} from "../../context/OrderDetails";
import {formatCurrency} from "../../util";

const Options = ({optionType}) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	const [orderDetails, updateItemCount] = useOrderDetails();

	const getScoop = async () => {
		try {
			const result = await axios.get(`http://localhost:3030/${optionType}`);
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
		return (
			<AlertBanner
				variant={"error"}
				message={"An unexpected error occurred. localhost:3030 is not connected."}
			/>
		);
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
		<div>
			<Heading as="h2" size="2xl" mb="5">
				{title}
			</Heading>
			<Text fontSize="2xl">{formatCurrency(pricePerItem[optionType])} each</Text>
			<p
				style={{
					fontWeight: "700",
				}}
			>
				{title} total {orderDetails.totals[optionType]}
			</p>
			<SimpleGrid minChildWidth="250px" spacing={10} mt="7">
				{optionItems}
			</SimpleGrid>
		</div>
	);
};

export default Options;
