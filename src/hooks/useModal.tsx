import { ReactNode, useState, createContext, Context, useCallback } from 'react';
import Modal from '../components/Modal/Modal';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface IModal {
  id?: string;
  isMobile: boolean;
  isOpen: boolean;
  content: ReactNode;
  size: ModalSize;
  isLocked: boolean;
  background?: string;
  open: (
    content: ReactNode,
    id?: string,
    mobile?: boolean,
    size?: ModalSize,
    onCloseCallback?: VoidFunction
  ) => void;
  close: () => void;
  lock: () => void;
  unLock: () => void;
  setOnClose: (onClose?: VoidFunction) => void;
  changeBackground: (background: string) => void;
  children?: ReactNode;
}

let ModalContext: Context<IModal | undefined>;
const { Provider } = (ModalContext = createContext<IModal | undefined>(undefined));

const useModal = () => {
  const [id, setId] = useState<string | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>();
  const [size, setSize] = useState<ModalSize>('md');
  const [isLocked, setIsLocked] = useState(false);
  const [background, setBackground] = useState<string | undefined>();
  const [onClose, setOnClose] = useState<VoidFunction | undefined>();

  const open = useCallback(
    (
      content: ReactNode,
      id: string = '',
      mobile: boolean = false,
      size?: ModalSize,
      onCloseCallback?: VoidFunction
    ) => {
      setId(id);
      setIsOpen(true);
      setContent(content);
      onCloseCallback && setOnClose(() => onCloseCallback);
      if (size) setSize(size);
      setIsMobile(mobile);
    },
    [setIsOpen, setContent, setSize, setOnClose]
  );

  const close = useCallback(() => {
    !isLocked && setIsOpen(false);
    onClose && onClose();
    setOnClose(undefined);
    setId(undefined);
    setContent(undefined);
    setBackground(undefined);
  }, [id, isLocked, setIsOpen, onClose, setId, setContent]);

  const lock = () => setIsLocked(true);
  const unLock = () => setIsLocked(false);
  const changeBackground = (background: string) => setBackground(background);

  return {
    id,
    isMobile,
    isOpen,
    content,
    size,
    isLocked,
    background,
    setOnClose,
    open,
    close,
    lock,
    unLock,
    changeBackground,
  };
};

interface IModalProvider {
  children: ReactNode;
}
const ModalProvider = ({ children }: IModalProvider) => {
  const {
    id,
    isMobile,
    isOpen,
    content,
    size,
    isLocked,
    background,
    open,
    close,
    lock,
    unLock,
    setOnClose,
    changeBackground,
  } = useModal();

  return (
    <Provider
      value={{
        id,
        isMobile,
        isOpen,
        content,
        size,
        isLocked,
        background,
        open,
        close,
        lock,
        unLock,
        setOnClose,
        changeBackground,
      }}
    >
      {children}
      <Modal />
    </Provider>
  );
};

export { useModal, ModalContext, ModalProvider };

export type { IModal };
