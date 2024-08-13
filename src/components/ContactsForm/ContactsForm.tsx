import StyledForm from '../../styled/StyledForm.ts';
import { Box, Stack, Typography } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import TextFieldWrapper from '../TextFieldWrapper/TextFieldWrapper.tsx';
import { useIsFormActive } from '../Card/IsFormActive.context.tsx';
import PhoneNumberField from './PhoneNumberField.tsx';
import LuboiDvijField from './LuboiDvijField.tsx';

const ContactsForm = () => {
  const isFormActive = useIsFormActive();

  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box>
          <StyledFormTitle>Общая информация</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <TextFieldWrapper name="contacts.lastName" label={'Фамилия'} required={true} disabled={!isFormActive} />
          <TextFieldWrapper name="contacts.firstName" label={'Имя'} required={true} disabled={!isFormActive} />
          <TextFieldWrapper name="contacts.middleName" label={'Отчество'} disabled={!isFormActive} />
        </Box>
      </Stack>
      <Stack gap={2} marginTop={2}>
        <Box>
          <StyledFormTitle>Контакты</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <PhoneNumberField disabled={!isFormActive} />
          <TextFieldWrapper name="contacts.email" label={'Email'} disabled={!isFormActive} />
        </Box>
        <Stack gap={2}>
          <Typography>Другое</Typography>
          <LuboiDvijField disabled={!isFormActive} />
        </Stack>
      </Stack>
    </StyledForm>
  );
};

export default ContactsForm;
