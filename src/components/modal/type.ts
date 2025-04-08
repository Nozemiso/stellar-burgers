import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  titleParamName?: string;
  onClose: () => void;
  children?: ReactNode;
};
