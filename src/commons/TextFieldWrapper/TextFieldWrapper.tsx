import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { FormFieldWrapperProps } from './FormFieldWrapper.type.ts';

const TextFieldWrapper = ({
  name,
  label,
  required,
  disabled,
  formControlProps,
  textFieldProps,
  helperTextProps,
}: FormFieldWrapperProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref, name }, fieldState: { error } }) => (
        <FormControl error={!!error} {...formControlProps} disabled={disabled}>
          <TextField
            name={name}
            disabled={disabled}
            label={label}
            placeholder=""
            value={value}
            onChange={(event) => onChange(event.target.value.trim())}
            ref={ref}
            required={required}
            error={!!error}
            {...textFieldProps}
          />
          <FormHelperText error={!!error} {...helperTextProps}>
            {error && error.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default TextFieldWrapper;
