import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
// import {OrderDetailsProvider} from "../../../context/OrderDetails";

test("update scoop subtotal when scoops changes", async () => {
	render(<Options optionType="scoops" />);
	// render(<Options optionType={"scoops"} />, {wrapper: OrderDetailsProvider});

	const scoopsSubtotal = screen.getByText("Scoops total $", {exact: false});
	expect(scoopsSubtotal).toHaveTextContent("0.00");

	const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "1");
	expect(scoopsSubtotal).toHaveTextContent("2.00");

	const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "2");
	expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when topping is ticked", async () => {
	render(<Options optionType="toppings" />);

	const toppingsSubTotal = screen.getByText("Toppings total $", {exact: false});
	expect(toppingsSubTotal).toHaveTextContent("0.00");

	const cherriesInput = await screen.findByRole("checkbox", {name: /cherries topping$/i});
	userEvent.click(cherriesInput);
	expect(toppingsSubTotal).toHaveTextContent("1.50");

	const hotfudge = await screen.findByRole("checkbox", {name: /hot fudge topping$/i});
	userEvent.click(hotfudge);
	expect(toppingsSubTotal).toHaveTextContent("3.00");

	userEvent.click(hotfudge);
	expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
	test("grand total updates properly if scoop is added first", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i});
		expect(grandTotal).toHaveTextContent("0.00");

		const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("4.00");

		const cherriesInput = await screen.findByRole("checkbox", {name: /cherries topping$/i});
		userEvent.click(cherriesInput);
		expect(grandTotal).toHaveTextContent("5.50");
	});
	test("grand total updates properly if topping is added first", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i});

		const cherriesInput = await screen.findByRole("checkbox", {name: /cherries topping$/i});
		userEvent.click(cherriesInput);
		expect(grandTotal).toHaveTextContent("1.50");

		const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("5.50");
	});
	test("grand total updates properly if item is removed", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {name: /grand total: \$/i});

		const cherriesInput = await screen.findByRole("checkbox", {name: /cherries topping$/i});
		userEvent.click(cherriesInput);
		expect(grandTotal).toHaveTextContent("1.50");

		const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("5.50");

		//remove 1 scoop of vanilla and check grand total
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "1");
		expect(grandTotal).toHaveTextContent("3.50");

		userEvent.click(cherriesInput);
		expect(grandTotal).toHaveTextContent("2.00");
	});
});
