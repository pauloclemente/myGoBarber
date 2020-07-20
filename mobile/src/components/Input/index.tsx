import React, {
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
	useCallback,
} from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
interface IInputProps extends TextInputProps {
	name: string;
	icon: string;
}
interface IInputValueRefence {
	value: string;
}
interface IInputRef {
	focus(): void;
}
const Input: React.RefForwardingComponent<IInputRef, IInputProps> = (
	{ name, icon, ...rest },
	ref,
) => {
	const inputElementRef = useRef<any>(null);
	const { registerField, defaultValue, fieldName, error } = useField(name);
	//ref
	const inputValueRef = useRef<IInputValueRefence>({ value: defaultValue });
	//states
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsField] = useState(false);
	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);
	const handleInputBlur = useCallback(() => {
		setIsFocused(false);
		if (inputValueRef.current.value) {
			setIsField(true);
		} else {
			setIsField(false);
		}
	}, []);

	useImperativeHandle(ref, () => ({
		focus() {
			inputElementRef.current.focus();
		},
	}));
	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputValueRef.current,
			path: 'value',
			setValue(ref: any, value) {
				inputValueRef.current.value = value;
				inputElementRef.current.setNativeProps({ text: value });
			},
			clearValue() {
				inputValueRef.current.value = '';
				inputElementRef.current.clear();
			},
		});
	}, [fieldName, registerField]);
	return (
		<Container isFocused={isFocused}>
			<Icon
				name={icon}
				size={20}
				color={isFocused || isFilled ? '#FF9000' : '#666360'}
			/>
			<TextInput
				ref={inputElementRef}
				keyboardAppearance="dark"
				placeholderTextColor="#666360"
				defaultValue={defaultValue}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChangeText={(value) => {
					inputValueRef.current.value = value;
				}}
				{...rest}
			/>
		</Container>
	);
};
export default forwardRef(Input);
