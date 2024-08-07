import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const roles = ['Разработчик', 'Тестер', 'Девопс', 'ПМ', 'Шлёпа'];

type RolesComponentProps = {
  value: string;
  onChange: any;
  error: Error;
  disabled: boolean;
};

const RolesComponent = ({ value, onChange, error, disabled }: RolesComponentProps) => {
  return (
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
  );
};

export default RolesComponent;
