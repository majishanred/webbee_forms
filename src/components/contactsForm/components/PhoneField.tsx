import { useEffect, useRef } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useIMask } from 'react-imask';
import { InputMaskElement } from 'imask';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

export const PhoneField = ({ disabled }: ContactsFormFieldProps) => {
  const phone = useInfoStore((state) => state.contactsInfo.phoneNumber);

  const { control, setValue } = useContactsForm();
  const { ref, maskRef } = useIMask(
    {
      mask: '+{7}(000)000-00-00',
    },
    {
      onAccept: (_value, maskRef) => changeContactsField('phoneNumber', maskRef.unmaskedValue),
      defaultUnmaskedValue: phone,
    },
  );

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
          <TextField
            label="Телефон"
            placeholder={'+7(999)999-99-99'}
            value={maskRef.current?.value}
            error={Boolean(error)}
            inputRef={ref}
            required
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PhoneField;
