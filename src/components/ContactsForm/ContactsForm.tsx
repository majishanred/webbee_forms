import { ContactsInfo } from '../../types/entities/Contacts.ts';
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
import { useData, useDataMethods } from '../../providers/FormsProvider.tsx';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactsSchema } from '../../schemas/ContactsSchema.ts';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';
import { Forms } from '../Card/Card.tsx';

export const ContactsForm = ({ formsRefs }: { formsRefs: MutableRefObject<Forms> }) => {
  const { isValidated, contactsData, errors } = useData().contacts;
  const { firstName, lastName, middleName, email, luboiDvij, phoneNumber } = contactsData;
  const { control, handleSubmit, getValues, formState } = useForm<ContactsInfo>({
    defaultValues: {
      firstName,
      lastName,
      middleName,
      email,
      luboiDvij,
      phoneNumber,
    },
    disabled: isValidated,
    resolver: zodResolver(contactsSchema),
    errors: errors,
  });

  const methods = useDataMethods();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    formsRefs.current.contactsForm = formRef.current;

    return () => {
      formsRefs.current.contactsForm = null;
    };
  }, []);

  useEffect(() => {
    methods.changeContacts({
      isValidated,
      errors: formState.errors,
      contactsData: getValues(),
    });
  }, [formState.errors]);

  const onSubmit: SubmitHandler<ContactsInfo> = (data) => {
    methods.changeContacts({
      isValidated: true,
      errors: {},
      contactsData: data,
    });
  };
  const onInvalid = () => {};

  return (
    <StyledForm noValidate onSubmit={handleSubmit(onSubmit, onInvalid)} ref={formRef}>
      <Stack gap={2}>
        <Box>
          <StyledFormTitle>Общая информация</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName="lastName"
            disabled={isValidated}
            control={control}
            label={'Фамилия'}
            required={true}
          />
          <FormFieldWrapper
            fieldName="firstName"
            disabled={isValidated}
            control={control}
            label={'Имя'}
            required={true}
          />
          <FormFieldWrapper fieldName="middleName" disabled={isValidated} control={control} label={'Отчество'} />
        </Box>
      </Stack>
      <Stack gap={2} marginTop={2}>
        <Box>
          <StyledFormTitle>Контакты</StyledFormTitle>
        </Box>
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName="phoneNumber"
            control={control}
            label={'Номер телефона'}
            required={true}
            disabled={isValidated}
            RenderComponent={PhoneNumberComponent}
          />
          <FormFieldWrapper fieldName="email" disabled={isValidated} control={control} label={'Email'} />
        </Box>
        <Stack gap={2}>
          <Typography>Другое</Typography>
          <FormFieldWrapper
            fieldName="luboiDvij"
            label={'Hui ego poka cho znaet'}
            control={control}
            disabled={isValidated}
            RenderComponent={LuboiDvijComponent}
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
