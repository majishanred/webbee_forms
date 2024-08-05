import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ProjectInfo } from '../../types/Project.ts';
import { Delete } from '@mui/icons-material';
import NameField from './components/NameField.tsx';
import SkillsField from './components/SkillsField.tsx';
import RoleField from './components/RoleField.tsx';
import BeginDateField from './components/BeginDateField.tsx';
import EndingDateField from './components/EndingDateField.tsx';
import StyledForm from '../../styled/StyledForm.ts';
import { deleteProject, invalidateProject, useInfoStore, validateProject } from '../../stores/InfoStore.ts';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';

const ProjectForm = ({ projectId }: { projectId: number }) => {
  const projectNumber = useInfoStore((state) => state.projects[projectId]!.projectNumber);
  const isValidated = useInfoStore((state) => state.projects[projectId]!.isValidated);

  const methods = useForm<ProjectInfo>();

  return (
    <FormProvider {...methods}>
      <StyledForm noValidate>
        <Stack gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledFormTitle paddingTop="8px">Проект №{projectNumber}</StyledFormTitle>
            {!isValidated && <Delete onClick={() => deleteProject(projectId)} />}
          </Box>
          <NameField projectId={projectId} disabled={isValidated} />
          <SkillsField projectId={projectId} disabled={isValidated} />
          <RoleField projectId={projectId} disabled={isValidated} />
          <Box display="flex" gap={1}>
            <BeginDateField projectId={projectId} disabled={isValidated} />
            <EndingDateField projectId={projectId} disabled={isValidated} />
          </Box>
        </Stack>
        <Stack marginTop={2}>
          <ButtonWrapper projectId={projectId} />
        </Stack>
      </StyledForm>
    </FormProvider>
  );
};

const ButtonWrapper = ({ projectId }: { projectId: number }) => {
  const result = useInfoStore((state) => state.projects[projectId]!.isValidated);

  return (
    <>
      {!result && (
        <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => validateProject(projectId)}>
          <Typography textTransform="uppercase">добавить</Typography>
        </Button>
      )}
      {result && (
        <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => invalidateProject(projectId)}>
          <Typography textTransform="uppercase">редактировать</Typography>
        </Button>
      )}
    </>
  );
};

export default ProjectForm;
