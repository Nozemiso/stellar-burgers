import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { Outlet, useLocation, useParams } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(
  ({ title, titleParamName, onClose, children }) => {
    const idTitle = titleParamName ? useParams()[titleParamName] : undefined;

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        e.key === 'Escape' && onClose();
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    return ReactDOM.createPortal(
      <>
        <ModalUI title={idTitle ? '#' + idTitle : title} onClose={onClose}>
          {children}
        </ModalUI>
        <Outlet />
      </>,
      modalRoot as HTMLDivElement
    );
  }
);
