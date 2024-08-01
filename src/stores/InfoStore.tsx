import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ContactsType } from '../types/Contacts.ts';
import { Project } from '../types/Project.ts';
import { BaseSyntheticEvent } from 'react';

const contactsDefaultValue: ContactsType = {
  contactsInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    luboiDvij: true,
  },
  changing: true,
  hasError: null,
};

type InfoStore = {
  contactsInfo: ContactsType;
  projectsInfo: {
    projects: Project[];
    projectsLength: number;
    submitHandlers: ((e?: BaseSyntheticEvent) => Promise<void>)[];
    errorEmittersIds: number[];
  };
};

type Actions = {
  changeContactsInfo: (contacts: ContactsType) => void;
  addProject: () => void;
  changeProject: (project: Project) => void;
  deleteProject: (project: Project) => void;
  validateAll: () => void;
  addSubmitHandler: (handler: (e?: BaseSyntheticEvent) => Promise<void>) => void;
  addErrorEmitter: (emitterId: number) => void;
  removeErrorEmitter: (emitterId: number) => void;
};

const defaultProject: Project = {
  id: 0,
  projectNumber: 0,
  projectInfo: {
    name: '',
    skills: [],
    role: '',
    beginDate: '',
    endDate: undefined,
  },
  changing: true,
  error: null,
};

export const useInfoStore = create<InfoStore & Actions>()(
  immer((set) => ({
    contactsInfo: contactsDefaultValue,
    projectsInfo: {
      projects: [],
      projectsLength: 0,
      errors: [],
      submitHandlers: [],
      errorEmittersIds: [],
    },
    changeContactsInfo: (contacts: ContactsType) => {
      set((state) => {
        state.contactsInfo = contacts;
      });
    },
    addProject: () => {
      set((state) => {
        state.projectsInfo.projectsLength += 1;
        state.projectsInfo.projects.push({
          ...defaultProject,
          projectNumber: state.projectsInfo.projectsLength,
          id: Date.now(),
        });
      });
    },
    changeProject: (project: Project) => {
      set((state) => {
        const projIndex = state.projectsInfo.projects.findIndex((item) => item.id === project.id);
        state.projectsInfo.projects[projIndex] = project;
      });
    },
    deleteProject: (project: Project) => {
      set((state) => {
        state.projectsInfo.projects = state.projectsInfo.projects.filter((item) => item.id !== project.id);
      });
    },
    validateAll: () => {
      set((state) =>
        state.projectsInfo.submitHandlers.forEach((submitHandler) => {
          submitHandler();
        }),
      );
    },
    addSubmitHandler: (handler) => {
      set((state) => {
        state.projectsInfo.submitHandlers.push(handler);
      });
    },
    addErrorEmitter: (error) => {
      set((state) => {
        !state.projectsInfo.errorEmittersIds.includes(error) && state.projectsInfo.errorEmittersIds.push(error);
      });
    },
    removeErrorEmitter: (id: number) => {
      set((state) => {
        state.projectsInfo.errorEmittersIds = state.projectsInfo.errorEmittersIds.filter(
          (emitterId) => emitterId !== id,
        );
      });
    },
  })),
);
