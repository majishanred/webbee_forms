export type BaseAutocompleteProps<T> = T extends { label: string; value: infer S }
  ? {
      name: string;
      label: string;
      disabled?: boolean;
      required?: boolean;
      limitTags?: number;
      valueOptions: { label: string; value: S }[];
    }
  : {
      name: string;
      label: string;
      disabled?: boolean;
      required?: boolean;
      limitTags?: number;
      valueOptions: string[];
    };
