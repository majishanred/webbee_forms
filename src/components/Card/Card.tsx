import { Box, Button, Stack, styled } from '@mui/material';
import ContactsForm from '../ContactsForm/ContactsForm.tsx';
import ProjectsFormFeed from '../ProjectsFormFeed/ProjectsFormFeed.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bigSchema } from '../../schemas/BigSchema.ts';
import Tabs from '../Tabs/Tabs.tsx';
import { IsFormActiveProvider } from './IsFormActive.context.tsx';
import { useState } from 'react';
import { Forms } from './Card.types.ts';

const Card = () => {
  const methods = useForm<Forms>({
    defaultValues: {
      contacts: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        luboiDvij: true,
      },
      projects: [],
    },
    resolver: zodResolver(bigSchema),
  });

  const [isFormActive, setIsFormActive] = useState<boolean>(true);

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <IsFormActiveProvider isActive={isFormActive} setIsActive={setIsFormActive}>
          <Tabs tabs={tabs} />
        </IsFormActiveProvider>
        <StyledSection justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={
              isFormActive
                ? methods.handleSubmit(
                    () => {
                      setIsFormActive(false);
                    },
                    () => {},
                  )
                : () => {
                    setIsFormActive(true);
                  }
            }
          >
            {isFormActive ? 'Сохранить' : 'Редактировать'}
          </Button>
        </StyledSection>
      </StyledContainer>
    </FormProvider>
  );
};

const tabs = [
  { title: 'Контактная информация', label: 'contacts', component: <ContactsForm /> },
  { title: 'Проекты', label: 'projects', component: <ProjectsFormFeed /> },
];

const StyledContainer = styled(Stack)`
  display: grid;
  grid-template-columns: max-content;
`;

const StyledSection = styled(Box)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.backgroundColors.lightBlue};
`;

export default Card;
