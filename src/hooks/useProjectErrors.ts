import { useInfoStore } from '../stores/InfoStore.ts';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { ProjectInfo } from '../types/Project.ts';

export const useProjectErrors = (projectId: number, fieldName: keyof ProjectInfo) => {
  const error = useInfoStore((state) => {
    if (!state.projects[projectId]) return undefined;
    return state.projects[projectId].errors && state.projects[projectId].errors[fieldName]
      ? state.projects[projectId].errors[fieldName]
      : undefined;
  });

  const { setError, clearErrors } = useFormContext();

  useEffect(() => {
    if (error) setError(fieldName, { message: error[0] });

    return () => {
      clearErrors(fieldName);
    };
  }, [error]);
};
