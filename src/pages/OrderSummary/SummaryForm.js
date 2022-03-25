import React, {useState} from "react";
import "../../styles/pages/Summary.scss";
import {
	Button,
	Checkbox,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from "@chakra-ui/react";

const SummaryForm = ({setOrderPhase}) => {
	const [tcchecked, setTcChecked] = useState(false);

	const checkboxLabel = (
		<>
			I agree to{" "}
			<Popover trigger="hover" placement="top-start">
				<PopoverTrigger>
					<span style={{color: "blue"}}>Terms and Conditions</span>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverBody>No ice cream will be delivered</PopoverBody>
				</PopoverContent>
			</Popover>
		</>
	);

	function confirmOrder(e) {
		e.preventDefault();
		console.log("hitting here");
		setOrderPhase("completed");
	}
	return (
		<div className="summary">
			<div className="summary-order">
				<form onSubmit={confirmOrder}>
					<div className="summary-order-checkbox">
						<Checkbox
							isChecked={tcchecked}
							name="Terms and Conditions"
							onChange={(e) => {
								setTcChecked(e.target.checked);
							}}
						>
							{checkboxLabel}
						</Checkbox>
					</div>
					<Button type="submit" variant={"solid"} colorScheme="blue" isDisabled={!tcchecked}>
						Confirm Order
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SummaryForm;
