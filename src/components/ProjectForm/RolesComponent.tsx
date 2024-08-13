import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const roles = ['Разработчик', 'Тестер', 'Девопс', 'ПМ', 'Шлёпа'];

const RolesComponent = ({ name, disabled }: { name: string; disabled: boolean }) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth required disabled={disabled}>
          <InputLabel error={!!error} disabled={disabled}>
            Роль на проекте
          </InputLabel>
          <Select
            label="Роль на проекте"
            value={value}
            onChange={onChange}
            required
            disabled={disabled}
            error={Boolean(error)}
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

export default RolesComponent;
