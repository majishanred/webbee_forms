import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ContactsInfo } from '../types/Contacts.ts';
import { ProjectInfo } from '../types/Project.ts';
import { contactsSchema } from '../schemas/ContactsSchema.ts';
import { projectSchema } from '../schemas/ProjectSchema.ts';
import { ZodError } from 'zod';

type Errors = Record<string, string[]>;

type Contacts = ContactsInfo & { isValidated: boolean; errors?: Errors };
type Project = ProjectInfo & { id: number; projectNumber: number; isValidated: boolean; errors?: Errors };

type InfoStoreType = {
  contactsInfo: Contacts;
  projectsIds: number[];
  projects: {
    [id: number]: Project | null;
  };
  errorEmittersId: number[];
  isEverythingValidated: boolean;
};

/*
@Note: надо думать над ошибок и общей типизацией некоторых объектов, она так работать не должна.
Возможно надо изменить саму структуру стора.
*/

export const useInfoStore = create<InfoStoreType>()(
  immer((_set) => ({
    contactsInfo: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      luboiDvij: true,
      isValidated: false,
    },
    projectsIds: [],
    projects: {},
    errorEmittersId: [],

    isEverythingValidated: false,
  })),
);

export const validateAll = () =>
  useInfoStore.setState((state) => {
    try {
      contactsSchema.parse(state.contactsInfo);
      state.contactsInfo.errors = undefined;
      state.contactsInfo.isValidated = true;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        state.contactsInfo.errors = error.formErrors.fieldErrors as Errors;
        state.contactsInfo.isValidated = false;
      }
    }

    state.projectsIds.forEach((element) => {
      if (!state.projects[element]) return;

      try {
        projectSchema.parse(state.projects[element]);
        state.errorEmittersId = state.errorEmittersId.filter((projectId) => projectId != element);
        state.projects[element]!.isValidated = true;
      } catch (error) {
        if (error instanceof ZodError) {
          state.projects[element].errors = error.formErrors.fieldErrors as Errors;
          state.projects[element].isValidated = false;
          state.errorEmittersId.push(element);
        }
      }
    });

    state.isEverythingValidated = !state.contactsInfo.errors && !state.errorEmittersId.length;
  });

export const changeContactsField = <T extends keyof ContactsInfo>(fieldName: T, value: Contacts[T]) =>
  useInfoStore.setState((state) => {
    state.contactsInfo[fieldName] = value;
  });

export const changeProjectField = <T extends keyof ProjectInfo>(projectId: number, fieldName: T, value: Project[T]) =>
  useInfoStore.setState((state) => {
    if (!state.projects[projectId]) return;
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
      isValidated: false,
    };
    state.projectsIds.push(newProject.id);
    state.projects[newProject.id] = newProject;
  });

export const deleteProject = (projectId: number) =>
  useInfoStore.setState((state) => {
    state.projects[projectId] = null;
    state.projectsIds = state.projectsIds.filter((id) => id !== projectId);
    state.errorEmittersId = state.errorEmittersId.filter((elem) => elem != projectId);
  });

export const invalidateEverything = () =>
  useInfoStore.setState((state) => {
    state.isEverythingValidated = false;
    state.contactsInfo.isValidated = false;
    state.projectsIds.forEach((projectId) => {
      if (!state.projects[projectId]) return;
      state.projects[projectId].isValidated = false;
    });
  });

export const validateProject = (projectId: number) =>
  useInfoStore.setState((state) => {
    if (!state.projects[projectId]) return;
    try {
      projectSchema.parse(state.projects[projectId]);

      state.errorEmittersId = state.errorEmittersId.filter((element) => element != projectId);
      state.projects[projectId].errors = undefined;
      state.projects[projectId].isValidated = true;
    } catch (error) {
      if (error instanceof ZodError) {
        state.projects[projectId].errors = error.formErrors.fieldErrors as Errors;
        state.errorEmittersId.push(projectId);
        state.projects[projectId].isValidated = false;
      }
    }
  });

export const invalidateProject = (projectId: number) =>
  useInfoStore.setState((state) => {
    state.projects[projectId]!.isValidated = false;
  });
