import { useFormContext } from 'react-hook-form';
import { ProjectInfo } from '../types/Project.ts';

export const useProjectForm = useFormContext<ProjectInfo>;
