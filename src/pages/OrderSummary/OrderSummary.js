import React from "react";
import {useOrderDetails} from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";
import "../../styles/pages/OrderConfirmation.scss";
import {Heading, List, ListIcon, ListItem} from "@chakra-ui/react";

const OrderSummary = ({setOrderPhase}) => {
	const [orderDetails] = useOrderDetails();

	const scoopArray = Array.from(orderDetails.scoops.entries());
	const scoopList = scoopArray.map(([key, value]) => (
		<ListItem key={key} color="orange.500" fontWeight="bold">
			<ListIcon as={"✅"} />
			{value} {key}
		</ListItem>
	));

	const toppingsArray = Array.from(orderDetails.toppings.keys());
	const toppingList = toppingsArray.map((key) => (
		<ListItem key={key} color="orange.500" fontWeight="bold">
			<ListIcon as={"✅"} />
			{key}
		</ListItem>
	));

	return (
		<div className="order_confirm">
			<div>
				<Heading as="h1" mb="5">
					Order Summary
				</Heading>

				<Heading as="h4" mb="2" size="md">
					Scoops: {orderDetails.totals.scoops}
				</Heading>
				<List spacing={3}>{scoopList}</List>

				<Heading as="h4" mt="2" mb="2" size="md">
					Toppings: {orderDetails.totals.toppings}
				</Heading>

				<List spacing={3}>{toppingList}</List>
				<SummaryForm setOrderPhase={setOrderPhase} />
			</div>
		</div>
	);
};

export default OrderSummary;
