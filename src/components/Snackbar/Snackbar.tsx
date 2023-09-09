import { AnimatePresence } from 'framer-motion';
import React, { FC, ReactNode, useEffect } from 'react';
import { SnackbarWrapper } from './styles';

export const Snackbar: FC<
  {
    open?: boolean;
    message?: string;
    autoHideDuration?: number;
    onClose?: () => void;
    children?: ReactNode | ReactNode[];
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ open, children, message, autoHideDuration, onClose, ...props }) => {
  useEffect(() => {
    if (autoHideDuration && open) {
      setTimeout(() => {
        onClose && onClose();
      }, autoHideDuration);
    }
  }, [autoHideDuration, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <SnackbarWrapper
          initial={{ opacity: 0, y: 80, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 80, x: '-50%' }}
        >
          {children ? children : <div className="regular-snack">{message}</div>}
        </SnackbarWrapper>
      )}
    </AnimatePresence>
  );
};
