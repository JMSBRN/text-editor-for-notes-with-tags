import { Chip } from '@mui/material';
import { styled } from 'styled-components';

interface TagStyledProps {
  hidden: number | undefined;
}
export const TagStyled = styled(Chip)<TagStyledProps>`
  opacity: ${({ hidden }) => (hidden !== undefined ? hidden : 1)};
`;
export default TagStyled;
