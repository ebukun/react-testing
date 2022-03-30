import {useOrderDetails} from "../../context/OrderDetails";
import Options from "./Options";
import "../../styles/pages/OrderEntry.scss";
import {Button, Heading} from "@chakra-ui/react";

const OrderEntry = ({setOrderPhase}) => {
	const [orderDetails] = useOrderDetails();

	function checkButttonDisability() {
		return orderDetails.totals.scoops === "$0.00";
	}

	const isButtonDisabled = checkButttonDisability();

	return (
		<div className="order__entry">
			<div className="items">
				<Options optionType={"scoops"} />
			</div>
			<div className="items">
				<Options optionType={"toppings"} />
			</div>
			<Heading as="h4" mb="5">
				Grand total: {orderDetails.totals.grandTotal}
			</Heading>
			<Button
				disabled={isButtonDisabled}
				variant={"solid"}
				colorScheme="blue"
				onClick={() => setOrderPhase("review")}
			>
				Place Order
			</Button>
		</div>
	);
};

export default OrderEntry;
