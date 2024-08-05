import { changeContactsField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useContactsForm } from '../../../hooks/useContactsForm.ts';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { ContactsFormFieldProps } from '../ContactsForm.types.ts';
import { useContactsErrors } from '../../../hooks/useContactsErrors.ts';

const LuboiDvij = ({ disabled }: ContactsFormFieldProps) => {
  const luboiDvij = useInfoStore((state) => state.contactsInfo.luboiDvij);
  const { control } = useContactsForm();

  useContactsErrors('luboiDvij');

  return (
    <Controller
      name="luboiDvij"
      control={control}
      disabled={disabled}
      render={({ fieldState: { error } }) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="За любой движ"
            checked={luboiDvij}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              changeContactsField('luboiDvij', target.checked);
            }}
            disabled={disabled}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormGroup>
      )}
    />
  );
};

export default LuboiDvij;
