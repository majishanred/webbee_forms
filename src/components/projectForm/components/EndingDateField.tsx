import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';
import { formatDate } from '../../../utils/formatDate.ts';
import { useCallback } from 'react';

const EndingDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const endingDate = useInfoStore((state) => state.projects[projectId]!.endDate);
  const { control } = useProjectForm();

  useProjectErrors(projectId, 'endDate');

  const changeDate = useCallback((e: Dayjs | null) => {
    if (!e) {
      changeProjectField(projectId, 'endDate', undefined);
      return;
    }

    if (e.isValid()) {
      changeProjectField(projectId, 'endDate', e.format('DD.MM.YYYY'));
    }
  }, []);

  return (
    <Controller
      name="endDate"
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth>
          <DateField
            label="Завершение работы"
            format="DD.MM.YYYY"
            value={formatDate(endingDate)}
            onChange={changeDate}
            disabled={disabled}
            clearable
            slotProps={{
              textField: {
                error: Boolean(error),
              },
            }}
          />
          <FormHelperText error>{error?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EndingDateField;
