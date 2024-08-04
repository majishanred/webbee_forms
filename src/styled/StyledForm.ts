import { styled } from '@mui/material';

const StyledForm = styled('form')<{ error?: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.backgroundColors.white};
  box-shadow: ${({ theme }) => theme.palette.shadows.formSectionShadow};

  outline: ${({ error, theme }) => (error ? '1px solid ' + theme.palette.error : 'none')};
`;

export default StyledForm;
