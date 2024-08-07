import StyledTab from '../../styled/StyledTab.ts';
import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Box } from '@mui/material';
import {useData} from "../../providers/FormsProvider.tsx";

type Tab = {
  Tab:
  Component: FC;
};

const TabsContext = createContext<Tab | null>(null);

export const Tabs = ({ formsRef, tabs }: { formsRef: any; tabs: Tab[] }) => {
  const [selectedTab, setSelectedTab] = useState<title>(null);

  return (
    <TabsProvider tabs={tabs}>
      <Box>
      </Box>
    </TabsProvider>
  );
};

type Label = 'contacts' | 'projects'

const Tab = ({ title, label }: { title: string; label: Label }) => {
  const errors = useData()[label].errors;

}

const TabsProvider = ({ children, tabs }: { tabs: Tab[] } & PropsWithChildren) => {
  const [tab, setTab] = useState<Tab>(tabs[0]);

  return <TabsContext.Provider value={{ tab }}>{children}</TabsContext.Provider>;
};
