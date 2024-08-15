import StyledForm from '../../styled/StyledForm.ts';
import { Box, Stack, Typography } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import TextFieldWrapper from '../../commons/TextFieldWrapper/TextFieldWrapper.tsx';
import { useIsFormActive } from '../Card/IsFormActive.context.tsx';
import CheckboxWrapper from '../../commons/CheckboxWrapper/CheckboxWrapper.tsx';
import PhoneNumberField from './PhoneNumberField.tsx';

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
          <PhoneNumberField
            disabled={isDisabled}
            name="contacts.phoneNumber"
            label="Телефон"
            mask="+{7}(000)000-00-00"
          />
          <TextFieldWrapper name="contacts.email" label="Email" disabled={isDisabled} />
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
