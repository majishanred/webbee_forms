import { changeProjectField, useInfoStore } from '../../../stores/InfoStore.ts';
import { useProjectForm } from '../../../hooks/useProjectForm.ts';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { useProjectErrors } from '../../../hooks/useProjectErrors.ts';
import { ProjectFormFieldProps } from '../ProjectForm.types.ts';
import { useCallback } from 'react';
import { formatDate } from '../../../utils/formatDate.ts';
import { Dayjs } from 'dayjs';

const BeginDateField = ({ projectId, disabled }: ProjectFormFieldProps) => {
  const beginDate = useInfoStore((state) => state.projects[projectId]!.beginDate);
  const { control } = useProjectForm();

  useProjectErrors(projectId, 'beginDate');

  const changeDate = useCallback((e: Dayjs | null) => {
    if (!e) {
      changeProjectField(projectId, 'beginDate', undefined);
      return;
    }

    if (e.isValid()) {
      changeProjectField(projectId, 'beginDate', e.format('DD.MM.YYYY'));
    }
  }, []);

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
            onChange={changeDate}
            required
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

export default BeginDateField;
