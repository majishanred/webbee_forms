import { ContactsInfo } from '../types/entities/Contacts.ts';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { ProjectInfo } from '../types/entities/Project.ts';
import { projectSchema } from '../schemas/ProjectSchema.ts';
import { contactsSchema } from '../schemas/ContactsSchema.ts';
import { ZodError } from 'zod';
import { FieldErrors } from 'react-hook-form';
import mapErrors from '../utils/mapErrors.ts';

export type Project = {
  projectData: ProjectInfo & { projectId: number; projectNumber: number };
  isValidated: boolean;
  errors: FieldErrors;
};

export type Contacts = {
  contactsData: ContactsInfo;
  isValidated: boolean;
  errors: FieldErrors;
};

type FormDataType = {
  contacts: Contacts;
  projects: Project[];
};

type DataMethods = {
  changeContacts: (contacts: Contacts) => void;
  changeProject: (project: Project) => void;
  deleteProject: (project: Project) => void;
  addNewProject: () => void;
  validateEverything: () => void;
  invalidateEverything: () => void;
};

const FormsContext = createContext<FormDataType | null>(null);
const WriteFormsContext = createContext<DataMethods | null>(null);

export const useData = () => {
  const ctx = useContext(FormsContext);
  if (!ctx) throw new Error('Context is not provided');

  return ctx;
};

export const useDataMethods = () => {
  const ctx = useContext(WriteFormsContext);
  if (!ctx) throw new Error('Context is not provided');

  return ctx;
};

export const FormsProvider = ({ children }: PropsWithChildren) => {
  const [formsData, setFormsData] = useState<FormDataType>({
    contacts: {
      isValidated: false,
      errors: {},
      contactsData: {},
    },
    projects: [],
  });

  const changeContacts = useCallback((contacts: Contacts) => {
    setFormsData((state) => {
      return {
        ...state,
        contacts: contacts,
      };
    });
  }, []);

  const updateProject = useCallback((project: Project) => {
    setFormsData((state) => {
      const projectId = state.projects.findIndex(
        (element) => element.projectData.projectId === project.projectData.projectId,
      );

      const newProjectsState = [...state.projects];
      newProjectsState[projectId] = project;

      return {
        ...state,
        projects: newProjectsState,
      };
    });
  }, []);

  const addNewProject = useCallback(
    () =>
      setFormsData((state) => {
        const defaultNewProject: Project = {
          projectData: {
            projectId: Date.now(),
            projectNumber: state.projects.length + 1,
            skills: [],
          },
          errors: {},
          isValidated: false,
        };

        return {
          ...state,
          projects: [...state.projects, defaultNewProject],
        };
      }),
    [],
  );

  const deleteProject = useCallback(
    (project: Project) =>
      setFormsData((state) => {
        const filteredProjects = state.projects.filter(
          (element) => element.projectData.projectId !== project.projectData.projectId,
        );

        return {
          ...state,
          projects: filteredProjects,
        };
      }),
    [],
  );

  const validateEverything = useCallback(
    () =>
      setFormsData((state) => {
        const newState = {
          contacts: state.contacts,
          projects: state.projects,
        };

        try {
          if (!state.contacts.isValidated) {
            contactsSchema.parse(state.contacts.contactsData);
            newState.contacts.isValidated = true;
            newState.contacts.errors = {};
          }
        } catch (e) {
          if (e instanceof ZodError) {
            newState.contacts.isValidated = false;
            newState.contacts.errors = mapErrors(e.errors);
          }
        }

        newState.projects = state.projects.map((project) => {
          const newProject = { ...project };

          try {
            if (!project.isValidated) {
              projectSchema.parse(project.projectData);
              newProject.isValidated = true;
              newProject.errors = {};
            }
          } catch (e) {
            if (e instanceof ZodError) {
              const errors = mapErrors(e.errors);
              newProject.isValidated = false;
              newProject.errors = errors;
            }
          }

          return newProject;
        });

        return newState;
      }),
    [],
  );

  const invalidateEverything = useCallback(() => {
    setFormsData((state) => {
      const invalidatedProjects = state.projects.map((project) => {
        return {
          ...project,
          isValidated: false,
        };
      });

      return {
        contacts: {
          ...state.contacts,
          isValidated: false,
        },
        projects: invalidatedProjects,
      };
    });
  }, []);

  const methods = useMemo(() => {
    return {
      changeContacts,
      changeProject: updateProject,
      deleteProject,
      addNewProject,
      validateEverything,
      invalidateEverything,
    };
  }, []);

  return (
    <WriteFormsContext.Provider value={methods}>
      <FormsContext.Provider value={formsData}>{children}</FormsContext.Provider>
    </WriteFormsContext.Provider>
  );
};
