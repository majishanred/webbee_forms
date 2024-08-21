import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { BaseFormFieldProps } from './BaseTextField.type.ts';

const BaseFormField = ({ name, label, required, disabled, ...otherProps }: BaseFormFieldProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref, name }, fieldState: { error } }) => (
        <FormControl error={!!error} disabled={disabled}>
          <TextField
            {...otherProps}
            name={name}
            disabled={disabled}
            label={label}
            placeholder=""
            value={value}
            onChange={onChange}
            ref={ref}
            required={required}
            error={!!error}
          />
          <FormHelperText error={!!error}>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BaseFormField;
