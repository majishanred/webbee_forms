import { DatePickerProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export interface DateComponentProps extends DatePickerProps<Dayjs> {
  name: string;
  disabled: boolean;
  label: string;
  required?: boolean;
}
