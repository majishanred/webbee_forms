import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { formatDate } from '../../utils/formatDate.ts';
import { Controller, useFormContext } from 'react-hook-form';

const DateComponent = ({
  name,
  label,
  disabled,
  required,
}: {
  name: string;
  disabled: boolean;
  label: string;
  required?: boolean;
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField
            label={label}
            format="DD.MM.YYYY"
            value={formatDate(value)}
            onChange={(e) => {
              if (!e) return;
              onChange(e.format('DD.MM.YYYY'));
            }}
            required={required}
            disabled={disabled}
            clearable
            slotProps={{
              textField: {
                error: !!error,
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
