import { addProject, useInfoStore } from '../stores/InfoStore.tsx';
import ProjectForm from './projectForm/ProjectForm.tsx';
import { Box, Button, styled } from '@mui/material';

const ProjectsFeed = () => {
  const projectsIds = useInfoStore((state) => state.projectsIds);
  return (
    <StyledContainer>
      {projectsIds.map((projectId) => (
        <ProjectForm projectId={projectId} key={projectId} />
      ))}
      <Button onClick={addProject}>+</Button>
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
