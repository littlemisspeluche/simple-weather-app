import { motion } from 'framer-motion';
import styled from 'styled-components';

export const NavWrapper = styled(motion.nav)`
  padding: 0 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;

  .hidden-sidebar & {
    padding: 0 0.5rem;
  }

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LinkWrapper = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;

  .hidden-sidebar & {
    height: 2.5rem;
    width: 2.5rem;
    justify-content: center;
    margin: 0 auto;
  }

  .link {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: start;
    color: #040e26;
    text-decoration: none;
    z-index: 5;
    padding: 0.5rem 1rem;
    width: 100%;
    height: 100%;

    .hidden-sidebar & {
      justify-content: center;
      padding: 0;
    }
  }

  .link-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    background-color: rgba(92, 84, 112, 0.15);
    z-index: 1;
  }

  .link-title {
    opacity: ${({ active }) => (active ? 1 : 0.8)};
    font-weight: ${({ active }) => (active ? 'bold' : 'regular')};
    white-space: nowrap;

    .hidden-sidebar & {
      display: none;
    }
  }
`;
