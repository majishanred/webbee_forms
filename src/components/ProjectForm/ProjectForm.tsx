import StyledForm from '../../styled/StyledForm.ts';
import { Box, Button, Stack } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import { Delete } from '@mui/icons-material';
import TextFieldWrapper from '../TextFieldWrapper/TextFieldWrapper.tsx';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import SkillsComponent from './SkillsComponent.tsx';
import { useIsFormActive, useSetIsFormActive } from '../Card/IsFormActive.context.tsx';
import { Forms } from '../Card/Card.types.ts';
import DateComponent from './DateComponent.tsx';
import RolesComponent from './RolesComponent.tsx';
import { useCallback, useMemo } from 'react';

export const ProjectForm = ({ projectIndex }: { projectIndex: number }) => {
  const { trigger, setValue, getValues } = useFormContext<Forms>();

  const { update, remove } = useFieldArray<Forms>({
    name: 'projects',
  });

  const projectData = useWatch({
    name: `projects[${projectIndex}]`,
  });

  const isFormActive = useIsFormActive();
  const setFormIsActive = useSetIsFormActive();
  const isValidated = useMemo(() => !isFormActive || projectData.isValidated, [projectData, isFormActive]);

  const deleteProject = () => {
    const projects = getValues().projects.filter((project) => project.projectId !== projectData.projectId);
    remove(projectIndex);
    setValue('projects', projects);
  };

  const validate = useCallback(async () => {
    //@Note: хз как это типизировать
    const result = await trigger(`projects[${projectIndex}]` as `projects.${number}`);
    if (result) update(projectIndex, { ...projectData, isValidated: true });
  }, [projectIndex, projectData, trigger, update]);

  const revalidate = useCallback(() => {
    update(projectIndex, { ...projectData, isValidated: false });
    setFormIsActive(true);
  }, [update, projectIndex, projectData, setFormIsActive]);
  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledFormTitle paddingTop="8px">Проект №{projectIndex + 1}</StyledFormTitle>
          {!isValidated && (
            <Delete
              onClick={() => {
                deleteProject();
              }}
              tabIndex={0}
            />
          )}
        </Box>
        <TextFieldWrapper
          name={`projects[${projectIndex}].name`}
          label={'Название проекта'}
          required={true}
          disabled={isValidated}
        />
        <SkillsComponent name={`projects[${projectIndex}].skills`} disabled={isValidated} />
        <RolesComponent name={`projects[${projectIndex}].role`} disabled={isValidated} />
        <Box display="flex" gap={1}>
          <DateComponent
            name={`projects[${projectIndex}].beginDate`}
            label={'Начало работы'}
            required={true}
            disabled={isValidated}
          />
          <DateComponent
            name={`projects[${projectIndex}].endDate`}
            label={'Завершение работы'}
            disabled={isValidated}
          />
        </Box>
      </Stack>
      <Stack marginTop={2}>
        <Stack marginLeft="auto">
          <Button
            variant="contained"
            onClick={() => {
              isValidated ? revalidate() : validate();
            }}
          >
            {isValidated ? 'Редактировать' : 'Сохранить'}
          </Button>
        </Stack>
      </Stack>
    </StyledForm>
  );
};
