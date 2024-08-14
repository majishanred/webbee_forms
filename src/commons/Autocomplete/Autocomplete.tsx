import { Controller } from 'react-hook-form';
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { AutocompleteWrapperType } from './AutocompleteWrapper.types.ts';

const AutocompleteWrapper = ({ name, label, disabled, valueOptions }: AutocompleteWrapperType) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={valueOptions}
            value={value}
            onChange={(_event, value) => {
              console.log(value);
              onChange(value);
            }}
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
