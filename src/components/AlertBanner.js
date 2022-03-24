import {Alert, AlertIcon, AlertDescription} from "@chakra-ui/react";

const AlertBanner = ({message, variant}) => {
	return (
		<Alert status={variant} variant="solid">
			<AlertIcon backgroundColor={"transparent !important"} />
			<AlertDescription backgroundColor={"transparent"}>{message}</AlertDescription>
		</Alert>
	);
};

export default AlertBanner;
