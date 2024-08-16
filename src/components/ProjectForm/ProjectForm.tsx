import StyledForm from '../../styled/StyledForm.ts';
import { Box, Button, Stack } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import { Delete } from '@mui/icons-material';
import TextFieldWrapper from '../../commons/TextFieldWrapper/TextFieldWrapper.tsx';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useIsFormActive, useSetIsFormActive } from '../Card/IsFormActive.context.tsx';
import { Forms } from '../Card/Card.types.ts';
import DateComponent from '../../commons/DateComponent/DateComponent.tsx';
import { useCallback, useMemo } from 'react';
import { roles, skills } from './ProjectForm.constants.ts';
import { ProjectFormProps } from './ProjectForm.types.ts';
import SelectWrapper from '../../commons/SelectWrapper/SelectWrapper.tsx';
import AutocompleteWrapper from '../../commons/AutocompleteWrapper/AutocompleteWrapper.tsx';

export const ProjectForm = ({ projectIndex }: ProjectFormProps) => {
  const { trigger, setValue, getValues } = useFormContext<Forms>();

  const { update, remove } = useFieldArray<Forms>({
    name: 'projects',
  });

  const projectData = useWatch({
    name: `projects[${projectIndex}]`,
  });

  const isDisabled = !useIsFormActive();
  const setFormIsActive = useSetIsFormActive();
  const isValidated = useMemo(() => {
    return isDisabled || projectData.isValidated;
  }, [projectData, isDisabled]);

  const deleteProject = useCallback(() => {
    const projects = getValues().projects.filter((project) => project.projectId !== projectData.projectId);
    remove(projectIndex);
    setValue('projects', projects);
  }, [getValues, projectData.projectId, projectIndex, remove, setValue]);

  const validate = useCallback(async () => {
    //@Note: хз как это типизировать
    const result = await trigger(`projects[${projectIndex}]` as `projects.${number}`);
    if (result) update(projectIndex, { ...projectData, isValidated: true });
  }, [projectIndex, projectData, trigger, update]);

  const revalidate = useCallback(() => {
    update(projectIndex, { ...projectData, isValidated: false });
    setFormIsActive(true);
  }, [update, projectIndex, projectData, setFormIsActive]);

  const handleButtonClick = useCallback(() => {
    return isValidated ? revalidate() : validate();
  }, [revalidate, validate, isValidated]);

  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledFormTitle paddingTop="8px">Проект №{projectIndex + 1}</StyledFormTitle>
          {!isValidated && <Delete onClick={deleteProject} tabIndex={0} />}
        </Box>
        <TextFieldWrapper
          name={`projects[${projectIndex}].name`}
          label={'Название проекта'}
          required={true}
          disabled={isValidated}
        />
        <AutocompleteWrapper
          name={`projects[${projectIndex}].skills`}
          label="Навыки"
          disabled={isValidated}
          valueOptions={skills}
          required={true}
        />
        <SelectWrapper
          name={`projects[${projectIndex}].role`}
          valueOptions={roles}
          label="Роль"
          disabled={isValidated}
          required={true}
        />
        <Box display="flex" gap={1}>
          <DateComponent
            name={`projects[${projectIndex}].beginDate`}
            label="Начало работы"
            required={true}
            disabled={isValidated}
          />
          <DateComponent name={`projects[${projectIndex}].endDate`} label="Завершение работы" disabled={isValidated} />
        </Box>
      </Stack>
      <Stack marginTop={2}>
        <Stack marginLeft="auto">
          <Button variant="contained" onClick={handleButtonClick}>
            {isValidated ? 'Редактировать' : 'Сохранить'}
          </Button>
        </Stack>
      </Stack>
    </StyledForm>
  );
};
