import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from 'components/Button/Button.styled';

export default function Button({ onLoadMore }) {
  return (
    <LoadMore type="button" onClick={onLoadMore}>
      Load more
    </LoadMore>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
