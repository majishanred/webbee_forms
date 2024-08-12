import { useFormState } from 'react-hook-form';
import StyledTab from '../../styled/StyledTab.ts';
import { useIsTabChosen } from './Tabs.tsx';
import { TabProps } from './Tabs.types.ts';

const useFormError = (label: string) => {
  const { errors } = useFormState();
  return errors[label];
};

const Tab = ({ tab }: TabProps) => {
  const errors = useFormError(tab.label);
  const [isChosen, setTab] = useIsTabChosen(tab);

  return (
    <StyledTab
      onClick={() => {
        setTab(tab);
      }}
      hasError={!!errors}
      isChosen={isChosen}
    >
      {tab.title}
    </StyledTab>
  );
};

export default Tab;
