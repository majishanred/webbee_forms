import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { DateComponentProps } from './DateComponent.types.ts';
import { formatDate } from '../../utils/formatDate.ts';
import dayjs from 'dayjs';

const DateComponent = ({
  name,
  label,
  disabled,
  required,
  format = 'DD.MM.YYYY',
  maxDate,
  minDate,
}: DateComponentProps) => {
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
            maxDate={dayjs(maxDate)}
            minDate={dayjs(minDate)}
          />
          <FormHelperText error>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default DateComponent;
