import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/shared/form/FormControlWrapper';
import FormControlWrapper from 'lib/components/shared/form/FormControlWrapper';
import * as React from 'react';

export type ControlledInputProps = FormControlWrapperProps & InputProps;

const ControlledInput = React.forwardRef(
  (
    {
      label,
      errorText,
      errorTextColor,
      isInvalid,
      isLoaded,
      isRequired,
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
        isRequired={isRequired}
        isLoaded={isLoaded}
      >
        <Input ref={ref} {...inputProps} isRequired={isRequired} />
      </FormControlWrapper>
    );
  },
);

export default ControlledInput;
