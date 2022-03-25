/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useMemo, useEffect} from "react";
import {pricePerItem} from "../constant";
import {formatCurrency} from "../util";

const orderDetails = createContext();

//create custom hook to check wheter we're inside a provider
function useOrderDetails() {
	const context = useContext(orderDetails);

	if (!context) {
		throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
	}
	return context;
}

function calculateSubtotal(optionType, optionCounts) {
	let optionCount = 0;
	for (const count of optionCounts[optionType].values()) {
		optionCount += count;
	}

	return optionCount * pricePerItem[optionType];
}

const OrderDetailsProvider = (props) => {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});
	const zeroCurrency = formatCurrency(0);
	const [totals, setTotal] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	function getStateTotal() {
		const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
		const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;

		setTotal({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal),
		});
	}

	function updateItemCount(itemName, count, optionType) {
		const newOptionCounts = {...optionCounts};

		const optionCountsMap = optionCounts[optionType];
		optionCountsMap.set(itemName, parseInt(count));

		setOptionCounts(newOptionCounts);
	}

	function resetOrder() {
		setOptionCounts({
			scoops: new Map(),
			toppings: new Map(),
		});
	}

	useEffect(() => {
		getStateTotal();
	}, [optionCounts]);

	const value = useMemo(() => {
		return [{...optionCounts, totals}, updateItemCount, resetOrder];
	}, [optionCounts, totals]);

	return <orderDetails.Provider value={value} {...props} />;
};

export {OrderDetailsProvider, useOrderDetails};
