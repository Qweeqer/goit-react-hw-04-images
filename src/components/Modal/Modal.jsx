import { useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import { Overlay, Picture } from 'components/Modal/Modal.styled';

export default function Modal({ onCloseModal, src, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
  });

  const handleCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleCloseModal}>
      <Picture src={src} alt={tags} />
    </Overlay>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onCloseModal: PropTypes.func,
};
