import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { CheckboxWrapperProps } from './CheckboxWrapper.types.ts';
import { useId } from 'react';

const CheckboxWrapper = ({ name, disabled, label }: CheckboxWrapperProps) => {
  const uniqueId = useId();
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox id={uniqueId} />}
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

export default CheckboxWrapper;
