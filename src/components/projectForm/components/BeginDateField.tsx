import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';
import { formatDate } from '../../../utils/formatDate.ts';

const BeginDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const beginDate = useInfoStore((state) => state.projects[projectId]!.beginDate);
  const { control } = useProjectForm();
  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeProjectField(projectId, 'beginDate', formatedDate);
  };

  useProjectErrors(projectId, 'beginDate');

  return (
    <Controller
      name="beginDate"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField
            label="Начало работы"
            format="DD.MM.YYYY"
            value={formatDate(beginDate)}
            onChange={onDateChanges}
            required
            disabled={disabled}
            clearable
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BeginDateField;
