import { ChipProps } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

export type SelectWrapperProps = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  valueOptions: string[];
  fullWidth?: boolean;
  chipProps?: ChipProps;
  clearIcon?: typeof ClearIcon;
  ListboxComponent?: 'ul' | 'ol' | 'div';
  slotProps?: { clearIndicator?: object; paper?: object; popper?: object; popupIndicator?: object };
};
