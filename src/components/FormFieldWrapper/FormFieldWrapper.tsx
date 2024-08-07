import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { FormFieldWrapperProps } from './FormFieldWrapper.type.ts';

const FormFieldWrapper = ({
  fieldName,
  label,
  required,
  control,
  disabled,
  RenderComponent,
  formControlProps,
}: FormFieldWrapperProps) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { value, onChange, ref, name }, fieldState: { error } }) =>
        RenderComponent ? (
          <RenderComponent
            required={required}
            value={value}
            onChange={onChange}
            inputRef={ref}
            error={error}
            label={label}
            disabled={disabled}
          />
        ) : (
          <FormControl error={!!error} {...formControlProps} disabled={disabled}>
            <TextField
              disabled={disabled}
              label={label}
              placeholder=""
              value={value}
              name={name}
              onChange={onChange}
              ref={ref}
              required={required}
              error={!!error}
            />
            <FormHelperText>{error && error.message}</FormHelperText>
          </FormControl>
        )
      }
    />
  );
};

export default FormFieldWrapper;
