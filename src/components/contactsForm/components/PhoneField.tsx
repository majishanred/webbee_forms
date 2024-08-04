import { useEffect, useRef } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.ts';
import { IMaskInputProps, IMaskMixin } from 'react-imask';
import { InputMaskElement, MaskElement } from 'imask';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

// @Note: типизации плохо, надо исправить, но из-за HOCa тут какой-то ужас аыаыаыаыаы.

export const PhoneField = ({ disabled }: ContactsFormFieldProps) => {
  const phone = useInfoStore((state) => state.contactsInfo.phoneNumber);

  const phoneInputRef = useRef<InputMaskElement>(null);

  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('phoneNumber', phone);
  }, [phone]);

  useContactsErrors('phoneNumber');

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <MaskedTextField
            label="Телефон"
            placeholder={'+7(999)999-99-99'}
            value={phone}
            error={Boolean(error)}
            inputRef={phoneInputRef}
            required
            mask={'+{7}(000)000-00-00'}
            onAccept={(value, mask) => changeContactsField('phoneNumber', mask.unmaskedValue)}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const MaskedTextField = IMaskMixin<InputMaskElement, TextFieldProps & IMaskInputProps<MaskElement>>(
  ({ inputRef, ...props }) => (
    <TextField
      {...props}
      inputRef={inputRef} // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
    />
  ),
);

export default PhoneField;
