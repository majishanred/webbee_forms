import { Controller } from 'react-hook-form';
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import { BaseAutocompleteProps } from './BaseAutocomplete.types.ts';
import { useId } from 'react';

const BaseAutocomplete = <T,>({
  name,
  label,
  disabled,
  required,
  limitTags,
  valueOptions,
  ...otherProps
}: BaseAutocompleteProps<T>) => {
  const uniqueId = useId();
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <Autocomplete
            {...otherProps}
            limitTags={limitTags}
            multiple
            disablePortal
            id={uniqueId}
            options={valueOptions}
            value={value}
            onChange={(_event, value) => onChange(value)}
            disabled={disabled}
            ListboxProps={{}}
            renderInput={(params) => <TextField {...params} error={!!error} label={label} required={required} />}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BaseAutocomplete;
