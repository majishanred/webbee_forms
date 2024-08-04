import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const BeginDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const beginDate = useInfoStore((state) => state.projects[projectId]!.beginDate);
  const { control, setValue } = useProjectForm();
  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeProjectField(projectId, 'beginDate', formatedDate);
  };

  useEffect(() => {
    setValue('beginDate', beginDate);
  }, [beginDate]);

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
            value={dayjs(beginDate, 'DD.MM.YYYY')}
            onChange={onDateChanges}
            required
            disabled={disabled}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BeginDateField;
