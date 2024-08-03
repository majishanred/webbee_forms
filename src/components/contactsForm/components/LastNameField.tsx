import { useEffect } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

const LastNameField = ({ disabled }: ContactsFormFieldProps) => {
  const lastName = useInfoStore((state) => state.contactsInfo.lastName);
  const changeLastName = changeContactsField;
  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('lastName', lastName);
  }, [lastName]);

  useContactsErrors('lastName');

  return (
    <Controller
      name="lastName"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Фамилия"
            placeholder="Иванов"
            value={lastName}
            onChange={(e) => changeLastName('lastName', e.target.value)}
            error={Boolean(error)}
            required
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default LastNameField;
