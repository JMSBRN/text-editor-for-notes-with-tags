import { Typography } from '@mui/material';
import { styled } from 'styled-components';

const ContentStyled = styled(Typography)`
  min-width: 130px;
  max-width: 700px;
  min-height: 40px;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  word-break: break-all;
  overflow: hidden;
`;

export default ContentStyled;
