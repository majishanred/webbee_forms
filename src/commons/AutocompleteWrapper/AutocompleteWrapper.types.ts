export type AutocompleteWrapperType = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  valueOptions: string[] | { label: string }[];
};
