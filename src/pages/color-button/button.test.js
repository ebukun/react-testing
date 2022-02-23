import {render, screen, fireEvent} from "@testing-library/react";
import ButtonPage, {replaceCamelWithSpace} from "./ButtonPage";

test("button has correct initial color", () => {
	render(<ButtonPage />);

	//find an element with a role of button and text of 'change to blue'
	const colorButton = screen.getByRole("button", {name: "Change to Midnight Blue"});

	//expect the background color to be red
	expect(colorButton).toHaveStyle({background: "MediumVioletRed"});

	//click button
	fireEvent.click(colorButton);

	//expect the background color to be blue
	expect(colorButton).toHaveStyle({background: "MidnightBlue"});

	//expect the btn text to be "Change to red"
	expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("inital condition", () => {
	render(<ButtonPage />);

	//check that the button starts out enabled
	const colorButton = screen.getByRole("button", {name: "Change to Midnight Blue"});
	expect(colorButton).toBeEnabled();

	//check that the checkbox starts out unchecked
	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();
});

test("checkbox disables button on first click and enables on second click ", () => {
	render(<ButtonPage />);

	//find DOM element
	const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
	const button = screen.getByRole("button");

	fireEvent.click(checkbox);
	expect(button).toBeDisabled();

	fireEvent.click(checkbox);
	expect(button).toBeEnabled();
});

test("test that color of button changes when it is disabled ", () => {
	render(<ButtonPage />);

	//find DOM element
	const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
	const button = screen.getByRole("button");

	fireEvent.click(checkbox);
	expect(button).toBeDisabled();
	expect(button).toHaveStyle({backgroundColor: "gray"});

	fireEvent.click(checkbox);
	expect(button).toBeEnabled();
	expect(button).toHaveStyle({backgroundColor: "MediumVioletRed"});
});

test("Disabled button has gray background and reverts to red", () => {
	render(<ButtonPage />);

	//find DOM element
	const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
	const button = screen.getByRole("button");

	//disable button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({backgroundColor: "gray"});

	//re-enable button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({backgroundColor: "MediumVioletRed"});
});

test("clicked disabled button has gray background and reverts to blue", () => {
	render(<ButtonPage />);

	//find DOM element
	const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
	const button = screen.getByRole("button", {name: "Change to Midnight Blue"});

	//change button to blue
	fireEvent.click(button);

	//disable button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({backgroundColor: "gray"});

	//re-enable button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({backgroundColor: "MidnightBlue"});
});

describe("spaces before camel-case capital letters", () => {
	test("Works for no inner capital letters", () => {
		expect(replaceCamelWithSpace("Red")).toBe("Red");
	});
	test("Works for one inner capital letters", () => {
		expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
	});
	test("Works for multiple inner capital letters", () => {
		expect(replaceCamelWithSpace("MediumVioletRed")).toBe("Medium Violet Red");
	});
});
