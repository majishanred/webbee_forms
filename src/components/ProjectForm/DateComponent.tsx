import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { formatDate } from '../../utils/formatDate.ts';
import { RenderComponent } from '../FormFieldWrapper/FormFieldWrapper.type.ts';

type DateComponentProps = {
  label: string;
  value: string;
  onChange: any;
  disabled: boolean;
  error: Error;
};

const DateComponent: RenderComponent<DateComponentProps> = ({
  label,
  value,
  onChange,
  disabled,
  error,
}: DateComponentProps) => {
  return (
    <FormControl fullWidth>
      <DateField
        label={label}
        format="DD.MM.YYYY"
        value={formatDate(value)}
        onChange={(e) => {
          if (!e) return;
          onChange(e.format('DD.MM.YYYY'));
        }}
        required
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
  );
};

export default DateComponent;
