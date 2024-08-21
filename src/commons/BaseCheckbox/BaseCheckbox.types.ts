import { CheckboxProps } from '@mui/material';

export interface BaseCheckboxProps extends CheckboxProps {
  name: string;
  disabled?: boolean;
  label: string;
}
