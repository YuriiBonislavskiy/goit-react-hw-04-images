import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import css from './Modal.module.css';

const Modal = ({ largePicture, onToggleModal }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onToggleModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onToggleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <img
        src={largePicture}
        className={css.Modal}
        alt=""
        onLoad={() => setLoading(false)}
      />
      {loading && <Loader />}
    </div>
  );
};

Modal.propTypes = {
  largePicture: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;
