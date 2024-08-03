import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const SkillsField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const skills = useInfoStore((state) => state.projects[projectId]!.skills);
  const changeSkills = changeProjectField;
  const { control, setValue } = useProjectForm();

  useEffect(() => {
    setValue('skills', skills);
  }, [skills]);

  useProjectErrors(projectId, 'skills');

  return (
    <Controller
      name="skills"
      control={control}
      render={({ field: { ref }, fieldState: { error } }) => (
        <FormControl>
          <InputLabel required>Навыки</InputLabel>
          <Select
            value={skills}
            onChange={(event) => {
              changeSkills(projectId, 'skills', [...skills, event.target.value]);
            }}
            ref={ref}
            label="Навыки"
            renderValue={(values) => (
              <Box display="flex" gap={1} flexWrap="wrap">
                {values?.map((element, index) => <Chip label={element} key={index} />)}
              </Box>
            )}
            required
            disabled={disabled}
          >
            {sklls.map((skill, index) => (
              <MenuItem key={index} value={skill}>
                <Typography>{skill}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const sklls = ['vue', 'react', 'nodejs', 'next', 'angular', 'svelte'];

export default SkillsField;
