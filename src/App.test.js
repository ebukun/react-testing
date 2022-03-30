import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("app order flow", async () => {
	// render app
	render(<App />);

	//add ice cream scoop and toppings
	const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "1");

	const chocolateInput = screen.getByRole("spinbutton", {name: "Chocolate"});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "2");

	const cherriesCheckbox = await screen.findByRole("checkbox", {name: /cherries topping$/i});
	userEvent.click(cherriesCheckbox);

	//find and click order button

	const orderSummaryButton = screen.getByRole("button", {name: /Place order/i});
	userEvent.click(orderSummaryButton);

	//check summary information based on order

	const summaryHeading = screen.getByRole("heading", {name: "Order Summary"});
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.getByRole("heading", {name: "Toppings: $1.50"});
	expect(toppingsHeading).toBeInTheDocument();

	//check summary option items
	expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
	expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
	expect(screen.getByText("Cherries")).toBeInTheDocument();

	//accept terms and conditions and click button to confirm order
	const tcChecked = screen.getByRole("checkbox", {name: /terms and conditions/i});
	userEvent.click(tcChecked);

	const confirmOrderButton = screen.getByRole("button", {name: /confirm order/i});
	userEvent.click(confirmOrderButton);

	//confirmation page

	//Expect "loading" to be displayed
	const loadingState = screen.getByText(/loading/i);
	expect(loadingState).toBeInTheDocument();

	//confirm order number on confimation pages
	const thankYouHeader = await screen.findByRole("heading", {name: /thank you/i});
	expect(thankYouHeader).toBeInTheDocument();

	//expect "loading" to be removed
	const notLoading = screen.queryByText(/loading/i);
	expect(notLoading).not.toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();

	//click new order button on confirmation page

	const newOrderButton = screen.getByRole("button", {name: /new order/i});
	userEvent.click(newOrderButton);

	//check that scoops and toppings subtotal have been reset
	const scoopsTotal = screen.getByText("Scoops total $0.00");
	expect(scoopsTotal).toBeInTheDocument();
	const toppingsTotal = screen.getByText("Toppings total $0.00");
	expect(toppingsTotal).toBeInTheDocument();

	//wait for items to appear so that Testing Library doesn't get angry about
	await screen.findByRole("spinbutton", {name: "Vanilla"});
	await screen.findByRole("checkbox", {name: /cherries topping$/i});
});

test("remove toppings header from summary page when no toppings", async () => {
	// render app
	render(<App />);

	//add ice cream scoop and toppings
	const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "1");

	const chocolateInput = screen.getByRole("spinbutton", {name: "Chocolate"});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "2");

	//find and click order button
	const orderSummaryButton = screen.getByRole("button", {name: /Place order/i});
	userEvent.click(orderSummaryButton);

	//check summary information based on order

	const summaryHeading = screen.getByRole("heading", {name: "Order Summary"});
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.queryByRole("heading", {name: /toppings/i});
	expect(toppingsHeading).not.toBeInTheDocument();
});
