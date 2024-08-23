import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { BaseCheckboxProps } from './BaseCheckbox.types.ts';
import { useId } from 'react';

const BaseCheckbox = ({ name, disabled, label, ...checkboxProps }: BaseCheckboxProps) => {
  const uniqueId = useId();
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox id={uniqueId} {...checkboxProps} />}
              label={label}
              checked={value}
              disabled={disabled}
              onChange={onChange}
              inputRef={ref}
            />
            <FormHelperText error>{error && error.message}</FormHelperText>
          </FormGroup>
        </FormControl>
      )}
    />
  );
};

export default BaseCheckbox;
