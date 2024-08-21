import { Box, Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray } from 'react-hook-form';
import { ProjectForm } from '../ProjectForm/ProjectForm.tsx';
import { useCallback } from 'react';
import { useSetIsFormActive } from '../Card/IsFormActive.context.tsx';
import { Forms } from '../Card/Card.types.ts';

const ProjectsFormFeed = () => {
  const { fields, append } = useFieldArray<Forms>({
    name: 'projects',
  });

  const setIsFormActive = useSetIsFormActive();

  const addNewProject = useCallback(() => {
    append([
      {
        projectId: Date.now(),
        isValidated: false,
      },
    ]);

    setIsFormActive(true);
  }, [append, setIsFormActive]);

  return (
    <StyledContainer>
      {fields.map((project, index) => (
        <ProjectForm projectIndex={index} key={project.id} />
      ))}
      <Button onClick={addNewProject}>
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
