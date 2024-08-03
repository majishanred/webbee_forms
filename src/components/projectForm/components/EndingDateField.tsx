import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.tsx';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';

const EndingDateField = ({ projectId }: { projectId: number }) => {
  const endingDate = useInfoStore((state) => state.projects[projectId].beginDate);
  const changeEndingDate = changeProjectField;
  const { control, setValue } = useProjectForm();

  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeEndingDate(projectId, 'endDate', formatedDate);
  };

  useEffect(() => {
    setValue('endDate', endingDate);
  }, [endingDate]);

  return (
    <Controller
      name="endDate"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField label="Завершение работы" format="DD.MM.YYYY" onChange={onDateChanges} />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EndingDateField;
