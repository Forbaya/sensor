import Joi from "joi";
import React from "react";

export interface IValidationError {
  [key: string]: string;
}

interface IUseValidation {
  errors: IValidationError;
  setErrors: React.Dispatch<React.SetStateAction<IValidationError>>;
  errorText: (field: string) => string;
  handleValidate: () => boolean;
  hasError: (field: string) => boolean;
  hasErrors: () => boolean;
}

export function useValidation<TForm>(
  form: TForm,
  schema: Joi.ObjectSchema,
): IUseValidation {
  const [errors, setErrors] = React.useState<IValidationError>({});

  const handleValidate = () => {
    const result = schema.validate(form, { abortEarly: false });
    const validation: IValidationError = {};

    if (result.error) {
      result.error.details.forEach((error: Joi.ValidationErrorItem) => {
        if (!!error && !!error.context && !!error.context.key)
          validation[error.context.key] = error.message;
      });

      setErrors(validation);
    }

    return Object.keys(validation).length > 0;
  };

  const errorText = (field: string): string => errors[field];
  const hasError = (field: string): boolean => !!errors[field];
  const hasErrors = (): boolean => Object.keys(errors).length > 0;

  return {
    errors,
    setErrors,
    handleValidate,
    errorText,
    hasError,
    hasErrors,
  };
}
