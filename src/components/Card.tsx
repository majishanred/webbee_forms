import { Box, Button, Stack, styled } from '@mui/material';
import { ReactNode, useState } from 'react';
import ContactsTab from './ContactsTab.tsx';
import ContactsForm from './contactsForm/ContactsForm.tsx';
import ProjectsTab from './ProjectsTab.tsx';
import ProjectsFeed from './ProjectsFeed.tsx';

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
        <Button variant="contained" sx={{ marginLeft: 'auto' }}>
          сохранить
        </Button>
      </StyledSection>
    </StyledContainer>
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
