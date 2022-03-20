import {render, screen} from "@testing-library/react";
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
