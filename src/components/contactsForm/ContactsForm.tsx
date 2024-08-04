import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactsSchema } from '../../schemas/ContactsSchema.ts';
import { Box, Stack, Typography } from '@mui/material';
import { ContactsInfo } from '../../types/Contacts.ts';
import FirstNameField from './components/FirstNameField.tsx';
import LastNameField from './components/LastNameField.tsx';
import MiddleNameField from './components/MiddleNameField.tsx';
import EmailField from './components/EmailField.tsx';
import PhoneField from './components/PhoneField.tsx';
import LuboiDvij from './components/LuboiDvij.tsx';
import StyledForm from '../../styled/StyledForm.ts';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import { useInfoStore } from '../../stores/InfoStore.ts';

const ContactsForm = () => {
  const methods = useForm<ContactsInfo>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      luboiDvij: true,
    },
  });

  const isValidated = useInfoStore((state) => state.isEverythingValidated);

  return (
    <FormProvider {...methods}>
      <StyledForm noValidate>
        <Stack gap={2}>
          <Box>
            <StyledFormTitle>Общая информация</StyledFormTitle>
          </Box>
          <Box display="flex" gap={1}>
            <LastNameField disabled={isValidated} />
            <FirstNameField disabled={isValidated} />
            <MiddleNameField disabled={isValidated} />
          </Box>
        </Stack>
        <Stack gap={2} marginTop={2}>
          <Box>
            <StyledFormTitle>Контакты</StyledFormTitle>
          </Box>
          <Box display="flex" gap={1}>
            <PhoneField disabled={isValidated} />
            <EmailField disabled={isValidated} />
          </Box>
          <Stack gap={2}>
            <Typography>Другое</Typography>
            <LuboiDvij disabled={isValidated} />
          </Stack>
        </Stack>
      </StyledForm>
    </FormProvider>
  );
};

export default ContactsForm;
