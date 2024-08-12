import { Dispatch, SetStateAction } from 'react';

export type TabType = {
  title: string;
  label: string;
  component: JSX.Element;
};

export type TabProps = {
  tab: TabType;
};

export type TabsContextType = { tab: TabType; setTab: Dispatch<SetStateAction<TabType>> };
