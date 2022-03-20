import {Alert, AlertIcon, AlertDescription, CloseButton} from "@chakra-ui/react";

const AlertBanner = ({message, variant}) => {
	return (
		<Alert status={variant || "error"}>
			<AlertIcon />
			<AlertDescription>
				{message || "An unexpected error occurred. Please try again later."}
			</AlertDescription>
			<CloseButton position="absolute" right="8px" top="8px" />
		</Alert>
	);
};

export default AlertBanner;
