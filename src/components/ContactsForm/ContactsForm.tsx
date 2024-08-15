import StyledForm from '../../styled/StyledForm.ts';
import { Box, Stack, Typography } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import TextFieldWrapper from '../../commons/TextFieldWrapper/TextFieldWrapper.tsx';
import { useIsFormActive } from '../Card/IsFormActive.context.tsx';
import PhoneNumberField from './PhoneNumberField.tsx';
import LuboiDvijField from './LuboiDvijField.tsx';

const ContactsForm = () => {
  const isDisabled = !useIsFormActive();

  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box>
          <StyledFormTitle>Общая информация</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <TextFieldWrapper name="contacts.lastName" label="Фамилия" required={true} disabled={isDisabled} />
          <TextFieldWrapper name="contacts.firstName" label="Имя" required={true} disabled={isDisabled} />
          <TextFieldWrapper name="contacts.middleName" label="Отчество" disabled={isDisabled} />
        </Box>
      </Stack>
      <Stack gap={2} marginTop={2}>
        <Box>
          <StyledFormTitle>Контакты</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <PhoneNumberField disabled={!isFormActive} />
          <TextFieldWrapper name="contacts.email" label="Email" disabled={!isFormActive} />
        </Box>
        <Stack gap={2}>
          <Typography>Другое</Typography>
          <CheckboxWrapper name={'contacts.luboiDvij'} label="За любой движ" disabled={isDisabled} />
        </Stack>
      </Stack>
    </StyledForm>
  );
};

export default ContactsForm;
