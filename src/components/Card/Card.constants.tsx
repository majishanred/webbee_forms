import ContactsForm from '../ContactsForm/ContactsForm.tsx';
import ProjectsFormFeed from '../ProjectsFormFeed/ProjectsFormFeed.tsx';
import { Forms } from './Card.types.ts';

export const tabs: {
  title: string;
  label: keyof Forms;
  component: JSX.Element;
}[] = [
  { title: 'Контактная информация', label: 'contacts', component: <ContactsForm /> },
  { title: 'Проекты', label: 'projects', component: <ProjectsFormFeed /> },
];
