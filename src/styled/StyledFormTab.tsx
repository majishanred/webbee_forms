import { styled, Stack } from '@mui/material';

export const StyledFormTab = styled(Stack)<{ error: unknown }>`
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: ${({ theme }) => theme.palette.shadows.formSectionShadow};

  outline: ${({ error, theme }) => (error ? '1px solid ' + theme.palette.error : 'none')};
`;
