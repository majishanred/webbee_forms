import { ContactsInfo } from '../../types/entities/Contacts.ts';
import { ProjectInfo } from '../../types/entities/Project.ts';

export type Forms = {
  contacts: ContactsInfo;
  projects: ProjectInfo[];
};
