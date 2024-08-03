import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';

const LuboiDvij = ({ disabled }: ContactsFormFieldProps) => {
  const luboiDvij = useInfoStore((state) => state.contactsInfo.luboiDvij);
  const changeLuboiDvij = changeContactsField;
  const { control, setValue } = useContactsForm();

  useEffect(() => {
    setValue('luboiDvij', luboiDvij);
  }, [luboiDvij]);

  return (
    <Controller
      name="luboiDvij"
      control={control}
      render={({ fieldState: { error } }) => (
        <>
          <FormControlLabel
            control={<Checkbox disabled={disabled} />}
            label="За любой движ"
            checked={luboiDvij}
            onChange={(e) => changeLuboiDvij('luboiDvij', e.target.checked)}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
};

export default LuboiDvij;
