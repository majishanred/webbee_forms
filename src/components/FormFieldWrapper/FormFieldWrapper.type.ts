import { Control } from 'react-hook-form';
import { FormControlProps, TextFieldProps } from '@mui/material';

export type FormFieldWrapperProps = {
  fieldName: string;
  label: string;
  required?: boolean;
  control: Control<any, any>;
  disabled?: boolean;
  RenderComponent?: RenderComponent<any>;
  formControlProps?: FormControlProps;
  textFieldProps?: TextFieldProps;
  helperTextProps?: TextFieldProps;
};

//@Note: не пизди за такую типизация, главное что работает пока что и ладно, если с остальным все ок - я поправлю.
export type RenderComponent<T extends any> = T extends any ? (props: T) => JSX.Element : never;
