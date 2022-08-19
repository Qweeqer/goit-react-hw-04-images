import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Form,
  SearchButton,
  SearchInput,
  SearchMenu,
} from 'components/Searchbar/Searchbar.styled';

import s from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    imageSearch: '',
  };

  handleNameChange = e => {
    this.setState({ imageSearch: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageSearch.trim() === '') {
      return toast.error('Please fill in the field!');
    }
    this.props.onSubmit(this.state.imageSearch);
    this.setState({ imageSearch: '' });
  };

  render() {
    return (
      <SearchMenu>
        <Form className={s.searchForm} onSubmit={this.handleSubmit}>
          <SearchButton className={s.viewPort} type="submit">
            Search
          </SearchButton>
          <SearchInput
            className={s.inputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageSearch"
            value={this.state.imageSearch}
            onChange={this.handleNameChange}
          />
          <div className={s.cylonEye}></div>
        </Form>
      </SearchMenu>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
