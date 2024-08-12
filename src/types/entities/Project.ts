import { FieldErrors } from 'react-hook-form';

export type ProjectInfo = {
  projectId: number;
  isValidated: boolean;
  name?: string;
  skills?: string[];
  role?: string;
  beginDate?: string;
  endDate?: string;
};

export type Project = {
  id: number;
  projectInfo: ProjectInfo;
  changing: boolean;
  error: unknown;
};
