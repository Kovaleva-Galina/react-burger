import { useCallback, useEffect, memo, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modals") as HTMLElement;

type TModalProps = {
  header?: string,
  onClose: () => void,
  children: ReactNode;
}

const Modal: FC<TModalProps> = ({ onClose, children, header }) => {

  const keyCb = useCallback((e: KeyboardEvent) : void => {
    if (e.code === 'Escape') {
      onClose()
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', keyCb);
    return () => {
      document.removeEventListener('keydown', keyCb);
    }
  }, [keyCb]);

  return ReactDOM.createPortal(
    (
      <div className={style.position}>
        <div className={`p-10 ${style.content}`} onClick={e => e.stopPropagation()}>
          <div className={style.header}>
            <p className='text text_type_main-large'>{header}</p>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </div>
    ),
    modalRoot,
  );
}
export default memo(Modal);
