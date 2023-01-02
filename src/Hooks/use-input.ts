import { useState } from "react";

const useInput = (
	descriptors = { type: "", name: "", label: "" },
	validationFunction: Function
) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [inpWasTouched, setInpwasTouched] = useState(false);

	const valueIsValid = validationFunction(enteredValue);
	const valueIsInvalid = inpWasTouched && !valueIsValid;

	const updateValue = (event: any) => {
		setEnteredValue((prevState) => event.target.value);
	};

	const inputBlurHandler = () => {
		setInpwasTouched((prevState) => true);
	};

	const resetInput = () => {
		setEnteredValue((prevState) => "");
		setInpwasTouched((prevState) => false);
	};

	const raiseError = () => {
		setEnteredValue((prevState) => "");
		setInpwasTouched((prevState) => true);
	};

	return {
		properties: {
			name: descriptors.name,
			type: descriptors.type,
			id: descriptors.name,
			value: enteredValue,
			onChange: updateValue,
			onBlur: inputBlurHandler,
			raiseError: raiseError,
		},
		validities: {
			isInvalid: valueIsInvalid,
			isValid: valueIsValid,
			reset: resetInput,
			label: descriptors.label,
		},
	};
};

export default useInput;
