import { Typography } from '@mui/material';
import { styled } from 'styled-components';

export const ContentTextStyledForEditMode = styled(Typography)`
  min-width: 130px;
  max-width: 600px;
  min-height: 30px;
  height: auto;
  word-break: break-all;
  overflow: hidden;
`;

export default ContentTextStyledForEditMode;
