import { motion } from 'framer-motion';
import styled from 'styled-components';

export const SnackbarWrapper = motion(styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .snackbar-message {
    font-family: PT Sans;
    background: #ffffff;
    color: #000000;
    padding: 0.5rem;
    border-radius: 5px;
  }
`);
