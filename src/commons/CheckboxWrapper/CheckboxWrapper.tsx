import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { CheckboxWrapperProps } from './CheckboxWrapper.types.ts';

const CheckboxWrapper = ({ name, disabled, label }: CheckboxWrapperProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
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
