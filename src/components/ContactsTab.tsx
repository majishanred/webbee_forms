import { Dispatch, SetStateAction } from 'react';
import StyledTab from '../styled/StyledTab.tsx';
import { Typography } from '@mui/material';
import { useInfoStore } from '../stores/InfoStore.tsx';

const ContactsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const hasErrors = useInfoStore((state) => Boolean(state.contactsInfo.errors));
  return (
    <StyledTab onClick={() => setTab('contacts')} chosen={tab === 'contacts'} error={hasErrors}>
      <Typography textTransform="uppercase">контактная информация</Typography>
    </StyledTab>
  );
};

export default ContactsTab;
