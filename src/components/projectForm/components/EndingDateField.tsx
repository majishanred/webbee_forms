import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';
import { formatDate } from '../../../utils/formatDate.ts';

const EndingDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const endingDate = useInfoStore((state) => state.projects[projectId]!.endDate);
  const { control } = useProjectForm();

  const onDateChanges = (e: dayjs.Dayjs | null) => {
    if (!e) return;

    const formatedDate = e.format('DD.MM.YYYY');

    if (formatedDate === 'Invalid Date') return;

    changeProjectField(projectId, 'endDate', formatedDate);
  };

  useProjectErrors(projectId, 'endDate');

  return (
    <Controller
      name="endDate"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField
            label="Завершение работы"
            format="DD.MM.YYYY"
            onChange={onDateChanges}
            disabled={disabled}
            value={formatDate(endingDate)}
            onError={(error) => console.log(error)}
            clearable
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EndingDateField;
