import {render, screen, fireEvent} from "@testing-library/react";
import ButtonPage from "./ButtonPage";

test("button has correct initial color", () => {
	render(<ButtonPage />);

	//find an element with a role of button and text of 'change to blue'
	const colorButton = screen.getByRole("button", {name: "Change to blue"});

	//expect the background color to be red
	expect(colorButton).toHaveStyle({background: "red"});

	//click button
	fireEvent.click(colorButton);

	//expect the background color to be blue
	expect(colorButton).toHaveStyle({background: "blue"});

	//expect the btn text to be "Change to red"
	expect(colorButton.textContent).toBe("Change to red");
});

test("inital condition", () => {
	render(<ButtonPage />);

	//check that the button starts out enabled
	const colorButton = screen.getByRole("button", {name: "Change to blue"});
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
