import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react';

const IsFormActiveContext = createContext<boolean | null>(null);
const SetIsFormActiveContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);
export const IsFormActiveProvider = ({
  isActive,
  setIsActive,
  children,
}: { isActive: boolean; setIsActive: Dispatch<SetStateAction<boolean>> } & PropsWithChildren) => {
  return (
    <IsFormActiveContext.Provider value={isActive}>
      <SetIsFormActiveContext.Provider value={setIsActive}>{children}</SetIsFormActiveContext.Provider>
    </IsFormActiveContext.Provider>
  );
};

export const useIsFormActive = () => {
  const ctx = useContext(IsFormActiveContext);

  if (ctx === null) throw new Error('Сontext is not provided');

  return ctx;
};

export const useSetIsFormActive = () => {
  const func = useContext(SetIsFormActiveContext);

  if (!func) throw new Error('No context provided');

  return func;
};
