import StyledForm from '../../styled/StyledForm.ts';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper.tsx';
import { FieldError, useFormContext } from 'react-hook-form';
import { useIMask } from 'react-imask';
import { useIsFormActive } from '../Card/IsFormActive.context.tsx';
import { Forms } from '../Card/Card.types.ts';

export const ContactsForm = () => {
  const { control } = useFormContext<Forms>();
  const isFormActive = useIsFormActive();

  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box>
          <StyledFormTitle>Общая информация</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName="contacts.lastName"
            control={control}
            label={'Фамилия'}
            required={true}
            disabled={!isFormActive}
          />
          <FormFieldWrapper
            fieldName="contacts.firstName"
            control={control}
            label={'Имя'}
            required={true}
            disabled={!isFormActive}
          />
          <FormFieldWrapper
            fieldName="contacts.middleName"
            control={control}
            label={'Отчество'}
            disabled={!isFormActive}
          />
        </Box>
      </Stack>
      <Stack gap={2} marginTop={2}>
        <Box>
          <StyledFormTitle>Контакты</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName="contacts.phoneNumber"
            control={control}
            label={'Номер телефона'}
            required={true}
            RenderComponent={PhoneNumberComponent}
            disabled={!isFormActive}
          />
          <FormFieldWrapper fieldName="contacts.email" control={control} label={'Email'} disabled={!isFormActive} />
        </Box>
        <Stack gap={2}>
          <Typography>Другое</Typography>
          <FormFieldWrapper
            fieldName="contacts.luboiDvij"
            label={'Hui ego poka cho znaet'}
            control={control}
            RenderComponent={LuboiDvijComponent}
            disabled={!isFormActive}
          />
        </Stack>
      </Stack>
    </StyledForm>
  );
};

type LuboiDvijProps = {
  required: boolean;
  value: boolean;
  onChange: any;
  ref: any;
  error: FieldError;
  disabled: boolean;
};

const LuboiDvijComponent = ({ required, value, onChange, ref, error, disabled }: LuboiDvijProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        label="За любой движ"
        checked={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        inputRef={ref}
      />
      <FormHelperText error>{error && error.message}</FormHelperText>
    </FormGroup>
  );
};

type PhoneNumberComponentProps = {
  required: boolean;
  value: string;
  onChange: any;
  error: FieldError;
  disabled: boolean;
};

const PhoneNumberComponent = ({ required, value, onChange, error, disabled }: PhoneNumberComponentProps) => {
  const {
    ref,
    value: iMaskValue,
    unmaskedValue,
  } = useIMask(
    {
      mask: '+{7}(000)000-00-00',
    },
    {
      defaultUnmaskedValue: value,
    },
  );

  return (
    <FormControl>
      <TextField
        label="Телефон"
        value={iMaskValue}
        required={required}
        disabled={disabled}
        onChange={() => onChange(unmaskedValue)}
        inputRef={ref}
        error={!!error}
      />
      <FormHelperText error>{error && error.message}</FormHelperText>
    </FormControl>
  );
};

export default ContactsForm;
