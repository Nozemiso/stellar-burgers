import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  titleParamName?: string;
  stretched?: boolean;
  onClose: () => void;
  children?: ReactNode;
};
