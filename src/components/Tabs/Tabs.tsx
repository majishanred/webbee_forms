import Tab from './Tab.tsx';
import { createContext, useContext, useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import { TabsContextType, TabType } from './Tabs.types.ts';

const ChooseTabContext = createContext<TabsContextType | null>(null);

export const useIsTabChosen = (tab: TabType) => {
  const ctx = useContext(ChooseTabContext);
  if (!ctx) throw new Error('No context provided');

  const { tab: selectedTab, setTab } = ctx;

  return [selectedTab === tab, setTab];
};

const Tabs = ({ tabs }: { tabs: TabType[] }) => {
  const [component, setComponent] = useState<TabType>(tabs[0]);
  const tabList = tabs.map((tab, index) => <Tab tab={tab} key={index} />);
  return (
    <Stack>
      <ChooseTabContext.Provider value={{ tab: component, setTab: setComponent }}>
        <Box>{tabList}</Box>
      </ChooseTabContext.Provider>
      <StyledSection>{component.component}</StyledSection>
    </Stack>
  );
};

const StyledSection = styled(Box)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.backgroundColors.lightBlue};
`;

export default Tabs;
