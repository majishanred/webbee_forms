import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

const LuboiDvijField = ({ disabled }: { disabled: boolean }) => {
  return (
    <Controller
      name={'contacts.luboiDvij'}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="За любой движ"
            checked={value}
            disabled={disabled}
            onChange={onChange}
            inputRef={ref}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormGroup>
      )}
    />
  );
};

export default LuboiDvijField;
