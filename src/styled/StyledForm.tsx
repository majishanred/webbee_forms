import { Stack, styled } from '@mui/material';

const StyledForm = styled('form')`
  background-color: #2196f30a;
`;

export const StyledFormSection = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export default StyledForm;
