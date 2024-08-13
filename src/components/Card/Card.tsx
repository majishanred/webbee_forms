import { Box, Button, Stack, styled, Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bigSchema } from '../../schemas/BigSchema.ts';
import { IsFormActiveProvider } from './IsFormActive.context.tsx';
import { useState } from 'react';
import { Forms, TabType } from './Card.types.ts';
import { tabs } from './Card.constants.tsx';
import { isObjectEmpty } from '../../utils/isObjectEmpty.ts';

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
  const [tab, setTab] = useState<TabType>(tabs[0]);

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <IsFormActiveProvider isActive={isFormActive} setIsActive={setIsFormActive}>
          <StyledTabs
            value={tab}
            onChange={(_event, newTab) => setTab(newTab)}
            hasErrors={!isObjectEmpty(methods.formState.errors)}
          >
            {tabs.map((tab, index) => (
              <StyledTab value={tab} label={tab.title} key={index} hasErrors={!!methods.formState.errors[tab.label]} />
            ))}
          </StyledTabs>
          <StyledSection>{tab.component}</StyledSection>
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

const StyledTab = styled(Tab)<TabProps & { hasErrors?: boolean }>`
  border-bottom: ${({ hasErrors }) => (hasErrors ? '2px' : '0')};
  & .MuiButtonBase-root .MuiTab-root {
    color: ${({ hasErrors, theme }) => (hasErrors ? theme.palette.error.main : theme.palette.primary.main)};
  }
`;

const StyledTabs = styled(Tabs)<TabsProps & { hasErrors?: boolean }>`
  & .MuiTabs-indicator {
    ${({ hasErrors, theme }) => hasErrors && 'background-color: ' + theme.palette.error.main};
  }
`;

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
