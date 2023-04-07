import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={style.modal_overlay} onClick={onClose} />
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}
