import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const RoleField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const role = useInfoStore((state) => state.projects[projectId]!.role);
  const { control, setValue } = useProjectForm();

  useEffect(() => {
    setValue('role', role);
  }, [role]);

  useProjectErrors(projectId, 'role');

  return (
    <Controller
      name="role"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth required>
          <InputLabel>Роль на проекте</InputLabel>
          <Select
            label="Роль на проекте"
            value={role}
            onChange={(event) => changeProjectField(projectId, 'role', event.target.value)}
            required
            disabled={disabled}
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>
                <Typography>{role}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const roles = ['Разработчик', 'Тестер', 'Девопс', 'ПМ', 'Шлёпа'];

export default RoleField;
