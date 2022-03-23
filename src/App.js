// import ButtonPage from "./pages/color-button/ButtonPage";
import Options from "./pages/Entry/Options";
import SummaryForm from "./pages/Summary/SummaryForm";
import OrderEntry from "./pages/Entry/OrderEntry";
import {OrderDetailsProvider} from "./context/OrderDetails";
import {ChakraProvider} from "@chakra-ui/react";
// import ScoopOptions from "./pages/Entry/ScoopOptions";

function App() {
	return (
		<div className="App">
			<OrderDetailsProvider>
				<ChakraProvider>
					<OrderEntry />
				</ChakraProvider>
			</OrderDetailsProvider>
		</div>
	);
}

export default App;
