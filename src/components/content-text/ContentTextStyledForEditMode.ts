import { Typography } from '@mui/material';
import { styled } from 'styled-components';

export const ContentTextStyledForEditMode = styled(Typography)`
  width: 80%;
  min-width: 300px;
  max-width: 600px;
  min-height: 60px;
  padding: 10px;
  height: auto;
  word-break: break-all;
  overflow: hidden;
`;

export default ContentTextStyledForEditMode;
