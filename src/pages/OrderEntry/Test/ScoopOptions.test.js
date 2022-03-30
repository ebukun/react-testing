import {render, screen} from "@testing-library/react";
import ScoopOptions from "../ScoopOptions";
import userEvent from "@testing-library/user-event";

test("input turns red on validation error", () => {
	render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

	//expect input to be invalid with negative number
	const input = screen.getByRole("spinbutton");
	userEvent.clear(input);
	userEvent.type(input, "-1");
	expect(input).toHaveAttribute("id", "input");
	expect(input).toHaveAttribute("aria-invalid", "true");


	//expect to be invalid when value is too high
	userEvent.clear(input);
	userEvent.type(input, "11");
	expect(input).toHaveAttribute("aria-invalid", "true");

	//valid input
	userEvent.clear(input);
	userEvent.type(input, "3");
	expect(input).not.toHaveAttribute("aria-invalid", "true");
});
