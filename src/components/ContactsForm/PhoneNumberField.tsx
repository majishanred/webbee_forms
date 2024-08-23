import MaskedTextField from '../../commons/MaskedTextField/MaskedTextField.tsx';
import { FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

const PhoneNumberField = ({
  disabled,
  name,
  label,
  mask,
}: {
  name: string;
  disabled: boolean;
  label: string;
  mask: string;
}) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl>
          <MaskedTextField
            mask={mask}
            value={value}
            onAccept={onChange}
            error={!!error}
            disabled={disabled}
            label={label}
          ></MaskedTextField>
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PhoneNumberField;
