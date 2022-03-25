import OrderEntry from "./pages/OrderEntry/OrderEntry";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import {OrderDetailsProvider} from "./context/OrderDetails";
import {ChakraProvider} from "@chakra-ui/react";
import {useState} from "react";

function App() {
	const [orderPhase, setOrderPhase] = useState("inProgress");

	function viewComponent() {
		if (orderPhase === "review") {
			return OrderSummary;
		}
		if (orderPhase === "completed") {
			return OrderConfirmation;
		}
		return OrderEntry;
	}

	const Component = viewComponent();

	return (
		<div className="app">
			<OrderDetailsProvider>
				<ChakraProvider>
					<div className="app-container">
						<Component setOrderPhase={setOrderPhase} />
					</div>
				</ChakraProvider>
			</OrderDetailsProvider>
		</div>
	);
}

export default App;
