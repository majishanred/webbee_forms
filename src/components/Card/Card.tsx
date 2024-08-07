import { Box, Button, Stack, styled } from '@mui/material';
import ContactsForm from '../ContactsForm/ContactsForm.tsx';
import { useData, useDataMethods } from '../../providers/FormsProvider.tsx';
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import { Tabs } from '../Tabs/Tabs.tsx';
import ProjectsFormFeed from '../ProjectsFormFeed/ProjectsFormFeed.tsx';
import StyledTab from '../../styled/StyledTab.ts';

export type Forms = {
  contactsForm: HTMLFormElement | null;
  projectsForms: Array<{
    projectId: number;
    form: HTMLFormElement;
  }>;
};

const Card = () => {
  const [selectedTab, setSelectedTab] = useState('contacts');
  //Note: может заменить на useImperativeHandlers, хотя зачем?
  const formsRefs = useRef<Forms>({
    contactsForm: null,
    projectsForms: [],
  });

  const Component = tabs[selectedTab].component;

  return (
    <StyledContainer>
      <Box>
        <ContactsTab tab={selectedTab} setTab={setSelectedTab} />
        <ProjectsTab tab={selectedTab} setTab={setSelectedTab} />
      </Box>
      <StyledSection>
        <Component formsRefs={formsRefs} />
      </StyledSection>
      <StyledSection justifyContent="flex-end">
        <SaveButton formsRef={formsRefs} />
      </StyledSection>
    </StyledContainer>
  );
};

const tabs: Tabs = {
  contacts: {
    component: ContactsForm,
    alias: 'контактная информация',
  },
  projects: {
    component: ProjectsFormFeed,
    alias: 'проекты',
  },
};

const ContactsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const errors = JSON.stringify(useData().contacts.errors) !== JSON.stringify({});

  return (
    <StyledTab onClick={() => setTab('contacts')} isChosen={tab === 'contacts'} hasError={errors}>
      Контактная информация
    </StyledTab>
  );
};

export const ProjectsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const errors = useData()
    .projects.map((project) => JSON.stringify(project.errors) !== JSON.stringify({}))
    .filter((elem) => elem).length;

  return (
    <StyledTab onClick={() => setTab('projects')} isChosen={tab === 'projects'} hasError={!!errors}>
      проекты
    </StyledTab>
  );
};

type Tabs = {
  [key: string]: { component: React.FC; alias: string };
};

const SaveButton = ({ formsRef }: { formsRef: MutableRefObject<Forms> }) => {
  const methods = useDataMethods();

  const isValidated =
    useData().contacts.isValidated &&
    !useData()
      .projects.map((project) => project.isValidated)
      .includes(false);

  return (
    <>
      {!isValidated && (
        <Button
          variant="contained"
          onClick={() => {
            console.log(formsRef.current.contactsForm);
            formsRef.current.contactsForm?.requestSubmit();
            formsRef.current.projectsForms.forEach((element) => element.form?.requestSubmit());
            methods.validateEverything();
          }}
        >
          Сохранить
        </Button>
      )}
      {isValidated && (
        <Button
          variant="contained"
          onClick={() => {
            methods.invalidateEverything();
          }}
        >
          Редактировать
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

export default Card;
