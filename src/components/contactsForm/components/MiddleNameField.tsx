import { useEffect } from 'react';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.ts';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

export const MiddleNameField = ({ disabled }: ContactsFormFieldProps) => {
  const middleName = useInfoStore((state) => state.contactsInfo.middleName);
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
            onChange={(event) => changeContactsField('middleName', event.target.value)}
            error={Boolean(error)}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default MiddleNameField;
