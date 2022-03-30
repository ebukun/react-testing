import userEvent from "@testing-library/user-event";
import {render, screen} from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop from the server", async () => {
	render(<Options optionType="scoops" />);

	//find images
	const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
	expect(scoopImages).toHaveLength(2);

	const altText = scoopImages.map((el) => el.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display toppings image", async () => {
	render(<Options optionType="toppings" />);

	const toppingsImage = await screen.findAllByRole("img", {name: /topping$/i});
	expect(toppingsImage).toHaveLength(3);

	const imageTitles = toppingsImage.map((img) => img.alt);
	expect(imageTitles).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("don't update total if scoops input is invalid", async () => {
	render(<Options optionType="scoops" />);

	//find input
	const input = await screen.findByRole("spinbutton", {name: "Vanilla"});
	userEvent.clear(input);
	userEvent.type(input, "-1");

	//make sure scoops subtotal hasn't been updated
	const subtotal = screen.getByText("Scoops total $0.00");
	expect(subtotal).toBeInTheDocument();
});
