import {render} from "@testing-library/react";
import {OrderDetailsProvider} from "../context/OrderDetails";
import {ChakraProvider} from "@chakra-ui/react";

const AllTheProviders = ({children}) => {
	return (
		<OrderDetailsProvider>
			<ChakraProvider>{children}</ChakraProvider>
		</OrderDetailsProvider>
	);
};

const customRender = (ui, options) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from "@testing-library/react";

// override render method
export {customRender as render};
