import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const NameField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const projectName = useInfoStore((state) => state.projects[projectId]!.name);
  const { control } = useProjectForm();

  useProjectErrors(projectId, 'name');

  return (
    <Controller
      name="name"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl>
          <TextField
            label="Название"
            placeholder="Название проекта"
            value={projectName}
            onChange={(e) => changeProjectField(projectId, 'name', e.target.value)}
            error={Boolean(error)}
            disabled={disabled}
            required
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default NameField;
