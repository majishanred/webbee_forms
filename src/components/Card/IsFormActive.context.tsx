import { Context, createContext, Dispatch, SetStateAction, useContext } from 'react';
import { IsFormActiveProviderProps } from './Card.types.ts';

const IsFormActiveContext = createContext<boolean | null>(null);
const SetIsFormActiveContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);

export const IsFormActiveProvider = ({ isActive, setIsActive, children }: IsFormActiveProviderProps) => {
  return (
    <IsFormActiveContext.Provider value={isActive}>
      <SetIsFormActiveContext.Provider value={setIsActive}>{children}</SetIsFormActiveContext.Provider>
    </IsFormActiveContext.Provider>
  );
};

const useContextHasContent = <T,>(context: Context<T>): NonNullable<T> => {
  const content = useContext(context);

  if (content === null || content === undefined) throw new Error('Context does not provide any content');

  return content;
};

export const useIsFormActive = () => {
  return useContextHasContent(IsFormActiveContext);
};

export const useSetIsFormActive = () => {
  return useContextHasContent(SetIsFormActiveContext);
};
