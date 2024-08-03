import { useFormContext } from 'react-hook-form';
import { ContactsInfo } from '../types/Contacts.ts';

export const useContactsForm = useFormContext<ContactsInfo>;
