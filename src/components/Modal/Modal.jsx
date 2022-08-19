import React from 'react';
import PropTypes from 'prop-types';

import { Overlay, Picture } from 'components/Modal/Modal.styled';

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    const { src, tags } = this.props;
    return (
      <Overlay onClick={this.handleCloseModal}>
        <Picture src={src} alt={tags} />
      </Overlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onCloseModal: PropTypes.func,
};
