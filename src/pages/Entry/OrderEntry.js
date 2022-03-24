import {useOrderDetails} from "../../context/OrderDetails";
import Options from "./Options";
import "../../styles/pages/OrderEntry.scss";
import {Heading} from "@chakra-ui/react";

const OrderEntry = () => {
	const [orderDetails] = useOrderDetails();
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
		</div>
	);
};

export default OrderEntry;
