import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Condition", () => {
	render(<SummaryForm />);

	const checkBox = screen.getByRole("checkbox", {name: /terms and conditions/i});
	expect(checkBox).not.toBeChecked();

	const confirmButton = screen.getByRole("button", {name: /confirm order/i});
	expect(confirmButton).toBeDisabled();
});

test("checkbox enables button on first click and disables on second click", () => {
	render(<SummaryForm />);

	const checkBox = screen.getByRole("checkbox", {name: /terms and conditions/i});
	const confirmButton = screen.getByRole("button", {name: /confirm order/i});

	userEvent.click(checkBox);
	expect(confirmButton).toBeEnabled();

	userEvent.click(checkBox);
	expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
	render(<SummaryForm />);

	// const nullpopover = screen.queryByText(/no ice cream will be delivered/i);
	// expect(nullpopover).not.toBeInTheDocument();
	// const termsAndConditions = screen.getByText(/terms and conditions/i);
	// userEvent.hover(termsAndConditions);
	// const popover = screen.queryByText(/no ice cream will be delivered/i);
	// expect(popover).toBeInTheDocument();
	// userEvent.unhover(termsAndConditions);
	// await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will be delivered/i));

	const popover = screen.getByText(/no ice cream will be delivered/i);
	expect(popover).not.toBeVisible();

	const termsAndConditions = screen.getByText(/terms and conditions/i);
	userEvent.hover(termsAndConditions);
	await waitFor(() => expect(popover).toBeVisible());

	userEvent.unhover(termsAndConditions);
	await waitFor(() => expect(popover).not.toBeVisible());
});
