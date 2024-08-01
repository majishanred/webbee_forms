export type ContactsInfo = {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  luboiDvij: boolean;
};

export type ContactsType = {
  contactsInfo: ContactsInfo;
  hasError: unknown;
  changing: boolean;
};
