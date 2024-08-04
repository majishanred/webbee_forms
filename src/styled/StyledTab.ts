import { Button, ButtonProps, styled } from '@mui/material';

const StyledTab = styled(Button)<ButtonProps & { isChosen: boolean; hasError: boolean }>`
  border-radius: 0;
  border-bottom: ${({ isChosen, hasError, theme }) =>
    isChosen || hasError ? '2px solid ' + theme.palette.primary.main : 'none'};
  border-color: ${({ hasError, theme }) => (hasError ? theme.palette.error.main : theme.palette.primary.main)};
`;

export default StyledTab;
