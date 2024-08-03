import { Dispatch, SetStateAction } from 'react';
import StyledTab from '../styled/StyledTab.tsx';
import { Typography } from '@mui/material';

const ContactsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  return (
    <StyledTab onClick={() => setTab('contacts')} chosen={tab === 'contacts'}>
      <Typography textTransform="uppercase">контактная информация</Typography>
    </StyledTab>
  );
};

export default ContactsTab;
