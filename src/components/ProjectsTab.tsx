import { Dispatch, SetStateAction } from 'react';
import { Typography } from '@mui/material';
import StyledTab from '../styled/StyledTab.tsx';

export const ProjectsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  return (
    <StyledTab onClick={() => setTab('projects')} chosen={tab === 'projects'}>
      <Typography textTransform="uppercase">проекты</Typography>
    </StyledTab>
  );
};

export default ProjectsTab;
