import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { Controller } from 'react-hook-form';
import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const SkillsField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const skills = useInfoStore((state) => state.projects[projectId]!.skills);
  const { control } = useProjectForm();

  useProjectErrors(projectId, 'skills');

  return (
    <Controller
      name="skills"
      control={control}
      render={({ field: { ref }, fieldState: { error } }) => (
        <FormControl>
          <InputLabel required error={Boolean(error)}>
            Навыки
          </InputLabel>
          <Select
            value={skills}
            onChange={(event) => {
              const targetValue = event.target.value as string;
              if (skills.includes(targetValue)) {
                changeProjectField(
                  projectId,
                  'skills',
                  skills.filter((value) => value != targetValue),
                );
                return;
              }
              changeProjectField(projectId, 'skills', [...skills, targetValue]);
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
            error={Boolean(error)}
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
