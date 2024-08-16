import { InputBaseProps } from '@mui/material';

export interface MaskedTextFieldProps extends InputBaseProps {
  mask: string;
  value: string;
  label: string;
  onAccept: (...event: any[]) => void;
}
