import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { RenderComponent } from '../FormFieldWrapper/FormFieldWrapper.type.ts';

const skills = ['vue', 'react', 'nodejs', 'next', 'angular', 'svelte'];

type SkillsComponentProps = {
  value: string[];
  onChange: (value: string[]) => void;
  error: Error;
  disabled: boolean;
};

const SkillsComponent: RenderComponent<SkillsComponentProps> = ({
  value,
  onChange,
  error,
  disabled,
}: SkillsComponentProps) => {
  return (
    <FormControl>
      <InputLabel required error={Boolean(error)} disabled={disabled}>
        Навыки
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => {
          /*@Note: я не ебу почему эта голова считает что тут массив строк
                (ну оно его от типа value берет) а не одна строка, либо кастить, либо с типами ебаться ыаыаыа.
          */
          const targetValue = e.target.value as string;
          !value.includes(targetValue)
            ? onChange([...value, targetValue])
            : onChange(value.filter((elem) => elem !== e.target.value));
        }}
        label="Навыки"
        renderValue={(values) => (
          <Box display="flex" gap={1} flexWrap="wrap">
            {values?.map((element, index) => <Chip label={element} key={index} />)}
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
  );
};

export default SkillsComponent;
