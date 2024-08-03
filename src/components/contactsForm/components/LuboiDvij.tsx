import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

const LuboiDvij = () => {
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
            control={<Checkbox />}
            label="За любой движ"
            checked={luboiDvij}
            onChange={(e) => changeLuboiDvij('luboiDvij', e.target.checked)}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
};

export default LuboiDvij;
