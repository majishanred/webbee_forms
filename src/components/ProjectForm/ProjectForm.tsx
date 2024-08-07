import StyledForm from '../../styled/StyledForm.ts';
import { Box, Button, Stack } from '@mui/material';
import { StyledFormTitle } from '../../styled/StyledFormTitle.ts';
import { Delete } from '@mui/icons-material';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper.tsx';
import { Project, useDataMethods } from '../../providers/FormsProvider.tsx';
import { ProjectInfo } from '../../types/entities/Project.ts';
import { FieldErrors, useForm } from 'react-hook-form';
import { MutableRefObject, useEffect, useRef } from 'react';
import DateComponent from './DateComponent.tsx';
import SkillsComponent from './SkillsComponent.tsx';
import rolesComponent from './RolesComponent.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../../schemas/ProjectSchema.ts';
import { Forms } from '../Card/Card.tsx';

/*
 * @Note: нельзя там в кнопке вставить тернарник, она тогда работает не так как ожиадется
 * (она крч повторно вызывает onSubmit). Откуда такое поведение - загадка дыры.
 * */
export const ProjectForm = ({ project, formsRefs }: { project: Project; formsRefs: MutableRefObject<Forms> }) => {
  const { isValidated, projectData, errors } = project;
  const { name, skills, role, beginDate, projectId, projectNumber } = projectData;

  const { control, handleSubmit, getValues, formState } = useForm<ProjectInfo>({
    defaultValues: {
      name,
      skills,
      role,
      beginDate,
    },
    errors: errors as FieldErrors,
    resolver: zodResolver(projectSchema),
  });

  const methods = useDataMethods();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formsRefs.current.projectsForms.push({
      projectId: projectId,
      form: formRef.current!,
    });

    return () => {
      formsRefs.current.projectsForms = formsRefs.current.projectsForms.filter((form) => form?.projectId !== projectId);
    };
  }, []);

  useEffect(() => {
    methods.changeProject({
      isValidated,
      errors: formState.errors,
      projectData: {
        ...project.projectData,
        ...getValues(),
      },
    });
  }, [formState.errors]);

  const onSubmit = (projectData: ProjectInfo) => {
    methods.changeProject({
      isValidated: true,
      errors: {},
      projectData: {
        ...projectData,
        projectId: projectId,
        projectNumber: projectNumber,
      },
    });
  };

  const onInvalid = (e: FieldErrors) => {
    methods.changeProject({
      ...project,
      isValidated: false,
      errors: e,
    });
  };

  return (
    <StyledForm noValidate onSubmit={handleSubmit(onSubmit, onInvalid)} ref={formRef}>
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledFormTitle paddingTop="8px">Проект №{projectNumber}</StyledFormTitle>
          {!isValidated && <Delete onClick={() => methods.deleteProject(project)} />}
        </Box>
        <FormFieldWrapper
          fieldName={'name'}
          control={control}
          label={'Название проекта'}
          required={true}
          disabled={isValidated}
        />
        <FormFieldWrapper
          fieldName={'skills'}
          control={control}
          label={'Умения'}
          required={true}
          disabled={isValidated}
          RenderComponent={SkillsComponent}
        />
        <FormFieldWrapper
          fieldName={'role'}
          control={control}
          label={'Роль на проекте'}
          required={true}
          disabled={isValidated}
          RenderComponent={rolesComponent}
        />
        <Box display="flex" gap={1}>
          <FormFieldWrapper
            fieldName={'beginDate'}
            control={control}
            label={'Начало работы'}
            required={true}
            disabled={isValidated}
            formControlProps={{
              fullWidth: true,
            }}
            RenderComponent={DateComponent}
          />
          <FormFieldWrapper
            fieldName={'endDate'}
            control={control}
            label={'Завершение работы'}
            formControlProps={{
              fullWidth: true,
            }}
            disabled={isValidated}
            RenderComponent={DateComponent}
          />
        </Box>
      </Stack>
      <Stack marginTop={2}>
        <Stack marginLeft="auto">
          {isValidated && (
            <Button
              onClick={() =>
                methods.changeProject({
                  ...project,
                  isValidated: false,
                })
              }
              variant="contained"
            >
              Редактировать
            </Button>
          )}
          {!isValidated && (
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          )}
        </Stack>
      </Stack>
    </StyledForm>
  );
};
