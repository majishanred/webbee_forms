import { FormControlProps, TextFieldProps } from '@mui/material';

//@Note: эта штука должна типизироваться вообще не так, но я пока не разобрался как это сделать нормально.
export type FormFieldWrapperProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  formControlProps?: FormControlProps;
  textFieldProps?: TextFieldProps;
  helperTextProps?: TextFieldProps;
};
