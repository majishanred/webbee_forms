import { ContactsInfo } from '../../types/entities/Contacts.ts';
import { ProjectInfo } from '../../types/entities/Project.ts';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type Forms = {
  contacts: ContactsInfo;
  projects: ProjectInfo[];
};

export type TabType = {
  label: string;
  component: JSX.Element;
};

export type IsFormActiveProviderProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;
