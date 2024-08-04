import { useInfoStore } from '../stores/InfoStore.ts';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export const useContactsErrors = (fieldName: string) => {
  const error = useInfoStore((state) =>
    state.contactsInfo.errors && state.contactsInfo.errors[fieldName]
      ? state.contactsInfo.errors[fieldName]
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
