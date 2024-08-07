import { FieldErrors } from 'react-hook-form';
import { ZodIssue } from 'zod';

const mapErrors: (zodErrors: ZodIssue[]) => FieldErrors = (zodErrors: ZodIssue[]) => {
  return zodErrors.reduce((prev, current) => {
    const path = current.path[0];
    return {
      ...prev,
      [path]: {
        message: current.message,
        type: null,
      },
    };
  }, {});
};

export default mapErrors;
