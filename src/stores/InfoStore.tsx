import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ContactsInfo } from '../types/Contacts.ts';
import { ProjectInfo } from '../types/Project.ts';

type Errors = {
  [fieldName: string]: {
    error: any;
  };
};
type Project = ProjectInfo & { id: number; projectNumber: number; errors?: {} };

type InfoStoreType = {
  contactsInfo: ContactsInfo;
  projectsIds: number[];
  projects: {
    [id: number]: Project;
  };
};

type Actions = {};

type ContactsKeys = keyof ContactsInfo;
type ProjectKeys = keyof ProjectInfo;

export const useInfoStore = create<InfoStoreType & Actions>()(
  immer((set) => ({
    contactsInfo: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      luboiDvij: true,
    },
    projectsIds: [],
    projects: {},
  })),
);

export const changeContactsField = (fieldName: ContactsKeys, value: string) =>
  useInfoStore.setState((state) => {
    state.contactsInfo[fieldName] = value;
  });

export const changeProjectField = (projectId: number, fieldName: ProjectKeys, value: string | string[]) =>
  useInfoStore.setState((state) => {
    state.projects[projectId][fieldName] = value;
  });

export const addProject = () =>
  useInfoStore.setState((state) => {
    const newProject: Project = {
      id: Date.now(),
      name: '',
      skills: [],
      role: '',
      beginDate: '',
      projectNumber: state.projectsIds.length + 1,
    };
    state.projectsIds.push(newProject.id);
    state.projects[newProject.id] = newProject;
  });
