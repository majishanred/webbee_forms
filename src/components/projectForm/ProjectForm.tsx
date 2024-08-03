import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ProjectInfo } from '../../types/Project.ts';
import { projectSchema } from '../../schemas/ProjectSchema.ts';
import { Delete } from '@mui/icons-material';
import NameField from './components/NameField.tsx';
import SkillsField from './components/SkillsField.tsx';
import RoleField from './components/RoleField.tsx';
import BeginDateField from './components/BeginDateField.tsx';
import EndingDateField from './components/EndingDateField.tsx';
import StyledForm from '../../styled/StyledForm.tsx';
import { deleteProject, invalidateProject, useInfoStore, validateProject } from '../../stores/InfoStore.tsx';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';

const ProjectForm = ({ projectId }: { projectId: number }) => {
  const projectNumber = useInfoStore((state) => state.projects[projectId]!.projectNumber);
  const isValidated = useInfoStore((state) => state.projects[projectId]!.isValidated);

  const methods = useForm<ProjectInfo>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      skills: [],
      role: '',
      beginDate: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <StyledForm noValidate>
        <Stack gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledFormTitle paddingTop="8px">Проект №{projectNumber}</StyledFormTitle>
            <Delete onClick={() => deleteProject(projectId)} />
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
          сохранить
        </Button>
      )}
      {result && (
        <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => invalidateProject(projectId)}>
          редактировать
        </Button>
      )}
    </>
  );
};

export default ProjectForm;
