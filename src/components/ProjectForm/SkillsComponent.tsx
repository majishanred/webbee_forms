import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const skills = ['vue', 'react', 'nodejs', 'next', 'angular', 'svelte'];

const SkillsComponent = ({ name, disabled }: { name: string; disabled: boolean }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <InputLabel required error={!!error} disabled={disabled}>
            Навыки
          </InputLabel>
          <Select
            value={value}
            onChange={(e) => {
              /*
              @Note: я не знаб почему эта голова считает что тут массив строк
              (оно его от типа value берет) а не одна строка, либо кастить, либо как то иначе.
              */
              const targetValue = e.target.value as string;
              !value.includes(targetValue)
                ? onChange([...value, targetValue])
                : onChange(value.filter((element: string) => element !== e.target.value));
            }}
            label="Навыки"
            renderValue={(values) => (
              <Box display="flex" gap={1} flexWrap="wrap">
                {values?.map((element: string, index: number) => <Chip label={element} key={index} />)}
              </Box>
            )}
            required
            error={Boolean(error)}
            disabled={disabled}
          >
            {skills.map((skill, index) => (
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

export default SkillsComponent;
