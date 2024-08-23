import { OutlinedSelectProps } from '@mui/material';

export interface SelectWrapperProps extends OutlinedSelectProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  valueOptions: string[];
}
