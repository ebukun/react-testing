import {server} from "../../../mocks/server";
import {render, screen} from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import {rest} from "msw";

test("handle server error on confirmation", async () => {
	server.use(
		rest.post("http://localhost:3030/order", (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);

	render(<OrderConfirmation setOrderPhase={jest.fn()} />);

	const alert = await screen.findByRole("alert");
	expect(alert).toHaveTextContent("Something went wrong. Please try again");
});
