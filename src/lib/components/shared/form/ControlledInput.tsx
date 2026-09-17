import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/shared/form/FormControlWrapper';
import FormControlWrapper from 'lib/components/shared/form/FormControlWrapper';
import * as React from 'react';

export type ControlledInputProps = Omit<FormControlWrapperProps, 'children'> &
  Omit<InputProps, 'invalid' | 'required' | 'disabled'>;

const ControlledInput = React.forwardRef(
  (
    {
      label,
      errorText,
      errorTextColor,
      isInvalid,
      invalid,
      isLoaded,
      isRequired,
      required,
      disabled,
      ...inputProps
    }: ControlledInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <FormControlWrapper
        label={label}
        errorText={errorText}
        errorTextColor={errorTextColor}
        isInvalid={isInvalid}
        invalid={invalid}
        isRequired={isRequired}
        required={required}
        disabled={disabled}
        isLoaded={isLoaded}
      >
        <Input
          ref={ref}
          {...inputProps}
          required={required ?? isRequired}
          disabled={disabled}
        />
      </FormControlWrapper>
    );
  },
);

export default ControlledInput;
