import { useIMask } from 'react-imask';
import { TextField } from '@mui/material';
import { MaskedTextFieldProps } from './MaskedTextField.types.ts';

const MaskedTextField = ({ disabled, label, mask, value, onAccept, error, ...otherProps }: MaskedTextFieldProps) => {
  const { ref } = useIMask(
    {
      mask: mask,
    },
    {
      onComplete: (value) => onAccept(value),
      defaultValue: value,
    },
  );

  return <TextField {...otherProps} label={label} required disabled={disabled} inputRef={ref} error={!!error} />;
};

export default MaskedTextField;
