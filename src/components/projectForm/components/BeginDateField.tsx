import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const BeginDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const beginDate = useInfoStore((state) => state.projects[projectId]!.beginDate);
  const changeBeginDate = changeProjectField;
  const { control, setValue } = useProjectForm();
  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeBeginDate(projectId, 'beginDate', formatedDate);
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
          <DateField label="Начало работы" format="DD.MM.YYYY" onChange={onDateChanges} required disabled={disabled} />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default BeginDateField;
