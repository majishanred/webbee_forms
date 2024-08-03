import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';

const NameField = ({ projectId }: { projectId: number }) => {
  const projectName = useInfoStore((state) => state.projects[projectId].name);
  const changeProjectName = changeProjectField;
  const { control, setValue } = useProjectForm();

  useEffect(() => {
    setValue('name', projectName);
  }, [projectName]);

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
            onChange={(e) => changeProjectName(projectId, 'name', e.target.value)}
            error={Boolean(error)}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default NameField;
