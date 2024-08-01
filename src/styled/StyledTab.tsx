import { Button, styled } from '@mui/material';

const StyledTab = styled(Button)<{ chosen: boolean; error?: unknown }>`
  border-radius: 0;
  border-bottom: ${({ chosen, error, theme }) =>
    chosen || error ? '2px solid ' + theme.palette.primary.main : 'none'};
  border-color: ${({ error, theme }) => (error ? theme.palette.error.main : theme.palette.primary.main)};
`;

export default StyledTab;
