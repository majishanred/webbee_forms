import { useIMask } from 'react-imask';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const PhoneNumberField = ({ disabled }: { disabled: boolean }) => {
  const { ref, value: iMaskValue } = useIMask({
    mask: '+{7}(000)000-00-00',
  });

  return (
    <Controller
      name={'contacts.phoneNumber'}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Телефон"
            value={iMaskValue}
            required
            disabled={disabled}
            onChange={onChange}
            inputRef={ref}
            error={!!error}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PhoneNumberField;
