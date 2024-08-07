import { useData, useDataMethods } from '../../providers/FormsProvider.tsx';
import { ProjectForm } from '../ProjectForm/ProjectForm.tsx';
import { Box, Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MutableRefObject } from 'react';
import { Forms } from '../Card/Card.tsx';

const ProjectsFormFeed = ({ formsRefs }: { formsRefs: MutableRefObject<Forms> }) => {
  const projects = useData().projects;
  const methods = useDataMethods();

  return (
    <StyledContainer>
      {projects.map((project) => (
        <ProjectForm project={project} key={project.projectData.projectId} formsRefs={formsRefs} />
      ))}
      <Button
        onClick={() => {
          methods.addNewProject();
        }}
      >
        <AddIcon sx={{ width: 64, height: 64 }} />
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 520px);
  grid-auto-rows: minmax(384px, max-content);
  gap: ${({ theme }) => theme.spacing(2)};
`;

export default ProjectsFormFeed;
