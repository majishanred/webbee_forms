import { InputBaseProps } from '@mui/material';

export interface MaskedTextFieldProps extends InputBaseProps {
  mask: string;
  value: string;
  label: string;
  //@Note: типизироать onChange из mui эт кошмар
  onAccept: any;
}
