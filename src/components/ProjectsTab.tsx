import { Dispatch, SetStateAction } from 'react';
import { Typography } from '@mui/material';
import StyledTab from '../styled/StyledTab.tsx';
import { useInfoStore } from '../stores/InfoStore.tsx';

export const ProjectsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const errors = useInfoStore((state) => state.errorEmittersId);
  return (
    <StyledTab onClick={() => setTab('projects')} chosen={tab === 'projects'} error={!!errors.length}>
      <Typography textTransform="uppercase">проекты</Typography>
    </StyledTab>
  );
};

export default ProjectsTab;
