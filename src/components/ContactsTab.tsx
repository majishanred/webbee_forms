import { Dispatch, SetStateAction } from 'react';
import StyledTab from '../styled/StyledTab.ts';
import { Typography } from '@mui/material';
import { useInfoStore } from '../stores/InfoStore.ts';

const ContactsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const hasErrors = useInfoStore((state) => Boolean(state.contactsInfo.errors));
  return (
    <StyledTab onClick={() => setTab('contacts')} isChosen={tab === 'contacts'} hasError={hasErrors}>
      <Typography textTransform="uppercase">контактная информация</Typography>
    </StyledTab>
  );
};

export default ContactsTab;
