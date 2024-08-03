import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { useEffect } from 'react';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';

const FirstNameField = () => {
  const firstName = useInfoStore((state) => state.contactsInfo.firstName);
  const changeName = changeContactsField;
  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('firstName', firstName);
  }, [firstName]);

  return (
    <Controller
      name="firstName"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Имя"
            placeholder="Иван"
            value={firstName}
            onChange={(e) => changeName('firstName', e.target.value)}
            error={Boolean(error)}
            required
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FirstNameField;
