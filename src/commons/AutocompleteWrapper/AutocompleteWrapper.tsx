import { Controller } from 'react-hook-form';
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { AutocompleteWrapperType } from './AutocompleteWrapper.types.ts';
import { useId } from 'react';

const AutocompleteWrapper = ({ name, label, disabled, valueOptions }: AutocompleteWrapperType) => {
  const uniqueId = useId();
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <Autocomplete
            multiple
            disablePortal
            id={uniqueId}
            options={valueOptions}
            value={value}
            onChange={(_event, value) => onChange(value)}
            disabled={disabled}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default AutocompleteWrapper;
