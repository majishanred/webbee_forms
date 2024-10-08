import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectWrapperProps } from './BaseSelect.types.ts';

const BaseSelect = ({ name, label, disabled, required, valueOptions, ...otherOptions }: SelectWrapperProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <InputLabel error={!!error} disabled={disabled} required={required}>
            {label}
          </InputLabel>
          <Select
            {...otherOptions}
            label={label}
            value={value}
            onChange={onChange}
            disabled={disabled}
            error={!!error}
            required={required}
          >
            {valueOptions.map((element, index) => (
              <MenuItem key={index} value={element}>
                <Typography>{element}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BaseSelect;
