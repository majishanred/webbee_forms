import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import ContactsTab from './ContactsTab.tsx';
import ContactsForm from './contactsForm/ContactsForm.tsx';
import ProjectsTab from './ProjectsTab.tsx';
import ProjectsFeed from './ProjectsFeed.tsx';
import { useInfoStore, validateAll, invalidateEverything } from '../stores/InfoStore.ts';

const Card = () => {
  const [selectedTab, setSelectedTab] = useState<string>('contacts');

  return (
    <StyledContainer>
      <Stack>
        <Box>
          <ContactsTab tab={selectedTab} setTab={setSelectedTab} />
          <ProjectsTab tab={selectedTab} setTab={setSelectedTab} />
        </Box>
      </Stack>
      <StyledSection>{tabs[selectedTab].component}</StyledSection>
      <StyledSection>
        <SaveButtonWrapper />
      </StyledSection>
    </StyledContainer>
  );
};

const SaveButtonWrapper = () => {
  const result = useInfoStore((state) => state.isEverythingValidated);

  return (
    <>
      {!result && (
        <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => validateAll()}>
          <Typography textTransform="uppercase">сохранить</Typography>
        </Button>
      )}
      {result && (
        <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => invalidateEverything()}>
          <Typography textTransform="uppercase">редактировать</Typography>
        </Button>
      )}
    </>
  );
};

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

const tabs: Tabs = {
  contacts: {
    component: <ContactsForm />,
    alias: 'контактная информация',
  },
  projects: {
    component: <ProjectsFeed />,
    alias: 'проекты',
  },
};

type Tabs = {
  [key: string]: { component: ReactNode; alias: string };
};

export default Card;
