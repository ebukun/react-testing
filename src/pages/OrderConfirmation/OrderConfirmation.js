/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@chakra-ui/react";
import {useOrderDetails} from "../../context/OrderDetails";
import "../../styles/pages/OrderConfirmation.scss";

const OrderConfirmation = ({setOrderPhase}) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const [_, __, resetOrder] = useOrderDetails();

	const updateOrder = () => {
		setLoading(true);
		axios
			.post(`http://localhost:3030/order`)
			.then((response) => {
				setOrderNumber(response.data.orderNumber);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	useEffect(() => {
		updateOrder();
	}, []);

	function handleClick() {
		resetOrder();
		setOrderPhase("inProgress");
	}

	if (loading && orderNumber === "") {
		return <div>Loading...</div>;
	}
	return (
		<div className="order_confirm">
			<div>
				<h1>Thank You!</h1>
				<p>Your order number is {orderNumber}</p>
				<p>as per our terms and conditions. You are getting nothing</p>
				<Button width="200px" variant={"solid"} colorScheme="blue" onClick={handleClick}>
					Create new Order
				</Button>
			</div>
		</div>
	);
};

export default OrderConfirmation;
