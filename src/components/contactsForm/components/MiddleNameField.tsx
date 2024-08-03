import { useEffect } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';

export const MiddleNameField = () => {
  const middleName = useInfoStore((state) => state.contactsInfo.middleName);
  const changeMiddleName = changeContactsField;
  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('middleName', middleName);
  }, [middleName]);

  return (
    <Controller
      name="middleName"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Отчество"
            placeholder="Иванович"
            value={middleName}
            onChange={(event) => changeMiddleName('middleName', event.target.value)}
            error={Boolean(error)}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default MiddleNameField;
