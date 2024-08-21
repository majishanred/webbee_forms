import { TextFieldProps } from '@mui/material';

export interface BaseFormFieldProps extends TextFieldProps<'standard'> {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}
