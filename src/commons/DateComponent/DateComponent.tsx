import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { DateComponentProps } from './DateComponent.types.ts';
import { formatDate } from '../../utils/formatDate.ts';

const DateComponent = ({ name, label, disabled, required, format = 'DD.MM.YYYY' }: DateComponentProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <DatePicker
            label={label}
            format={format}
            value={formatDate(value)}
            onChange={(value) => {
              if (!value) {
                onChange(null);
                return;
              }
              onChange(value.toDate());
            }}
            disabled={disabled}
            slotProps={{
              textField: {
                error: !!error,
                required: required,
              },
            }}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default DateComponent;
