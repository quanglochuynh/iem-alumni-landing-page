import { useState } from 'react';

export interface IDisclosureControls<T = boolean> {
  isOpen: boolean;
  open: (data?: T) => void;
  close: () => void;
  data: T | null | undefined;
  updateOpen: (value: boolean) => void;
}

export function useDisclosure<T = boolean>(): IDisclosureControls<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null | undefined>(undefined);

  const updateOpen = (value: boolean) => {
    setIsOpen(value);
  };

  const open = (data?: T) => {
    setIsOpen(true);
    if (data) {
      setData(data);
    }
  };
  const close = () => {
    setIsOpen(false);
    setData(undefined);
  };

  return {
    isOpen,
    open,
    close,
    data,
    updateOpen,
  };
}
