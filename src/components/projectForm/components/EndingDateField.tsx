import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';

const EndingDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const endingDate = useInfoStore((state) => state.projects[projectId]!.beginDate);
  const { control, setValue } = useProjectForm();

  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeProjectField(projectId, 'endDate', formatedDate);
  };

  useEffect(() => {
    setValue('endDate', endingDate);
  }, [endingDate]);

  useProjectErrors(projectId, 'endDate');

  return (
    <Controller
      name="endDate"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField label="Завершение работы" format="DD.MM.YYYY" onChange={onDateChanges} disabled={disabled} />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EndingDateField;
