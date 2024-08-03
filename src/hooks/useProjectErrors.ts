import { useInfoStore } from '../stores/InfoStore.tsx';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export const useProjectErrors = (projectId: number, fieldName: string) => {
  const error = useInfoStore((state) =>
    state.projects[projectId].errors && state.projects[projectId].errors[fieldName]
      ? state.projects[projectId].errors[fieldName]
      : undefined,
  );

  const { setError, clearErrors } = useFormContext();

  useEffect(() => {
    if (error) setError(fieldName, { message: error[0] });

    return () => {
      clearErrors(fieldName);
    };
  }, [error]);
};
