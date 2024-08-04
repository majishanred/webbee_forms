import { addProject, useInfoStore } from '../stores/InfoStore.ts';
import ProjectForm from './projectForm/ProjectForm.tsx';
import { Box, Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProjectsFeed = () => {
  const projectsIds = useInfoStore((state) => state.projectsIds);

  const isValidated = useInfoStore((state) => state.isEverythingValidated);

  return (
    <StyledContainer>
      {projectsIds.map((projectId) => (
        <ProjectForm projectId={projectId} key={projectId} />
      ))}
      <Button onClick={addProject} disabled={isValidated}>
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

export default ProjectsFeed;
