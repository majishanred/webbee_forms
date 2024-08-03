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
import { useInfoStore } from '../../stores/InfoStore.tsx';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';

const ProjectForm = ({ projectId }: { projectId: number }) => {
  const projectNumber = useInfoStore((state) => state.projects[projectId].projectNumber);
  const methods = useForm<ProjectInfo>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      skills: [],
      role: '',
      beginDate: '',
    },
  });

  const onSubmit = (data: ProjectInfo) => {
    console.log('Cool');
  };

  return (
    <FormProvider {...methods}>
      <StyledForm noValidate onSubmit={methods.handleSubmit(onSubmit, () => {})}>
        <Stack gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledFormTitle paddingTop="8px">Проект №{projectNumber}</StyledFormTitle>
            <Delete onClick={() => console.log('Удаляю нахуй')} />
          </Box>
          <NameField projectId={projectId} />
          <SkillsField projectId={projectId} />
          <RoleField projectId={projectId} />
          <Box display="flex" gap={1}>
            <BeginDateField projectId={projectId} />
            <EndingDateField projectId={projectId} />
          </Box>
        </Stack>
        <Stack marginTop={2}>
          <Button variant="contained" type="submit" sx={{ marginLeft: 'auto' }}>
            <Typography textTransform="uppercase">добавить</Typography>
          </Button>
        </Stack>
      </StyledForm>
    </FormProvider>
  );
};

export default ProjectForm;
