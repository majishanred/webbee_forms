import StyledForm from '../../styled/StyledForm.ts';
import { Box, Button, Stack } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import { Delete } from '@mui/icons-material';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper.tsx';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import DateComponent from './DateComponent.tsx';
import SkillsComponent from './SkillsComponent.tsx';
import rolesComponent from './RolesComponent.tsx';
import { useIsFormActive, useSetIsFormActive } from '../Card/IsFormActive.context.tsx';
import { Forms } from '../Card/Card.types.ts';

export const ProjectForm = ({ index }: { index: number }) => {
  const { control, trigger, setValue, getValues } = useFormContext<Forms>();

  const { update, remove } = useFieldArray<Forms>({
    name: 'projects',
  });

  const projectData = useWatch({
    name: `projects[${index}]`,
  });

  const isFormActive = useIsFormActive();
  const setFormIsActive = useSetIsFormActive();
  const isValidated = !isFormActive || projectData.isValidated;

  const deleteProject = () => {
    const projects = getValues().projects.filter((project) => project.projectId !== projectData.projectId);
    remove(index);
    setValue('projects', projects);
  };

  const validate = async () => {
    //@Note: хз как это типизировать, может ts-ignore?
    const result = await trigger(`projects[${index}]`);
    if (result) update(index, { ...projectData, isValidated: true });
  };

  const revalidate = async () => {
    update(index, { ...projectData, isValidated: false });
    setFormIsActive(true);
  };
  return (
    <StyledForm noValidate>
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledFormTitle paddingTop="8px">Проект №{index + 1}</StyledFormTitle>
          {!isValidated && (
            <Delete
              onClick={() => {
                deleteProject();
              }}
              tabIndex={0}
            />
          )}
        </Box>
        <FormFieldWrapper
          fieldName={`projects[${index}].name`}
          control={control}
          label={'Название проекта'}
          required={true}
          disabled={isValidated}
        />
        <FormFieldWrapper
          fieldName={`projects[${index}].skills`}
          control={control}
          label={'Умения'}
          required={true}
          RenderComponent={SkillsComponent}
          disabled={isValidated}
        />
        <FormFieldWrapper
          fieldName={`projects[${index}].role`}
          control={control}
          label={'Роль на проекте'}
          required={true}
          disabled={isValidated}
          RenderComponent={rolesComponent}
        />
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName={`projects[${index}].beginDate`}
            control={control}
            label={'Начало работы'}
            required={true}
            formControlProps={{
              fullWidth: true,
            }}
            RenderComponent={DateComponent}
            disabled={isValidated}
          />
          <FormFieldWrapper
            fieldName={`projects[${index}].endDate`}
            control={control}
            label={'Завершение работы'}
            formControlProps={{
              fullWidth: true,
            }}
            RenderComponent={DateComponent}
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
