import { useEffect, useRef } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { IMaskMixin } from 'react-imask';
import { InputMaskElement } from 'imask';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

export const PhoneField = ({ disabled }: ContactsFormFieldProps) => {
  const phone = useInfoStore((state) => state.contactsInfo.phoneNumber);
  const changePhone = changeContactsField;

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
            onAccept={(value, mask) => changePhone('phoneNumber', mask.unmaskedValue)}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const MaskedTextField = IMaskMixin(({ inputRef, ...props }) => (
  <TextField
    {...props}
    inputRef={inputRef} // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
  />
));

export default PhoneField;
