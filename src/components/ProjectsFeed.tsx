import ProjectForm from './Project.tsx';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { Project } from '../types/Project.ts';
import { StyledFormSection } from '../styled/StyledForm.tsx';

const ProjectsFeed = () => {
  const projects = useInfoStore((state) => state.projectsInfo.projects);
  const addProject = useInfoStore((state) => state.addProject);
  const validateAll = useInfoStore((state) => state.validateAll);

  return (
    <>
      <StyledFormSection>
        <StyledGridContainer>
          {projects.map((project: Project) => (
            <ProjectForm key={project.id} project={project} />
          ))}
          <StyledAddButton onClick={() => addProject()}>+</StyledAddButton>
        </StyledGridContainer>
      </StyledFormSection>
      <StyledFormSection>
        <Stack>
          <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={() => validateAll()}>
            <Typography textTransform="uppercase">сохранить</Typography>
          </Button>
        </Stack>
      </StyledFormSection>
    </>
  );
};

const StyledGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 520px);
  grid-auto-rows: minmax(384px, max-content);

  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledAddButton = styled(Button)`
  font-size: 128px;
  font-weight: 200;
  height: 100%;
`;

export default ProjectsFeed;
