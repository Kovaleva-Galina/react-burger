import { useCallback, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modals");

const Modal = ({ onClose, children, header }) => {


  const keyCb = useCallback((e) => {
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
        <div className={`pt-10 pb-15 pr-10 pl-10 ${style.content}`} onClick={e=>e.stopPropagation()}>
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

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
  header: PropTypes.string,
}
