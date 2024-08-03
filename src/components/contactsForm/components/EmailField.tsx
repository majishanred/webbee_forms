import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useEffect } from 'react';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

const EmailField = ({ disabled }: ContactsFormFieldProps) => {
  const email = useInfoStore((state) => state.contactsInfo.email);
  const changeEmail = changeContactsField;
  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('email', email);
  }, [email]);

  useContactsErrors('email');

  return (
    <Controller
      name="email"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => changeEmail('email', e.target.value)}
            error={Boolean(error)}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EmailField;
