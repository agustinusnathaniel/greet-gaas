import { Field, Skeleton } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type FormControlWrapperProps = {
  label?: ReactNode;
  errorText?: ReactNode;
  errorTextColor?: string;
  isLoaded?: boolean;
  invalid?: boolean;
  isInvalid?: boolean;
  required?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

const FormControlWrapper = ({
  label,
  errorText,
  errorTextColor,
  invalid,
  isInvalid,
  required,
  isRequired,
  disabled,
  isLoaded = true,
  children,
}: FormControlWrapperProps) => {
  const isInvalidValue = invalid || isInvalid || !!errorText;
  const isRequiredValue = required || isRequired;
  return (
    <Field.Root
      invalid={isInvalidValue}
      required={isRequiredValue}
      disabled={disabled}
    >
      {label && (
        <Field.Label>
          {label}
          {isRequiredValue && <Field.RequiredIndicator />}
        </Field.Label>
      )}

      <Skeleton loading={!isLoaded} width="full">
        {children}

        {errorText && (
          <Field.ErrorText color={errorTextColor}>{errorText}</Field.ErrorText>
        )}
      </Skeleton>
    </Field.Root>
  );
};

export default FormControlWrapper;
