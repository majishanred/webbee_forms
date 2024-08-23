import { TextFieldProps } from '@mui/material';

export interface MaskedTextFieldProps extends TextFieldProps<'standard'> {
  mask: string;
  value: string;
  label: string;
  onAccept: (...event: any[]) => void;
}
