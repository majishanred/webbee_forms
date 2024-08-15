import { BaseTextFieldProps, FormControlProps, FormHelperTextProps, TextField, TextFieldProps } from '@mui/material';

//@Note: вот это уже лучше, но я б хотел попытаться сделать чтоб эта штука понимала какой контрол в нее прилетает и давала подсказку для name. Но эт чет сложно
export interface FormFieldWrapperProps
  extends Exclude<BaseTextFieldProps, 'name' | 'label' | 'required' | 'disabled' | 'value' | 'onChange'> {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  formControlProps?: FormControlProps;
  textFieldProps?: Exclude<TextFieldProps, 'value' | 'onChange'>;
  helperTextProps?: FormHelperTextProps;
  textFieldSlot?: typeof TextField;
}
