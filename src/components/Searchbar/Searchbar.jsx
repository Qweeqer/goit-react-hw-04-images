import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Form,
  SearchButton,
  SearchInput,
  SearchMenu,
} from 'components/Searchbar/Searchbar.styled';

import s from 'components/Searchbar/Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [imageSearch, setImageSearch] = useState('');

  const handleNameChange = e => {
    setImageSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageSearch.trim() === '') {
      return toast.error('Please fill in the field!');
    }
    onSubmit(imageSearch);
    setImageSearch('');
  };

  return (
    <SearchMenu>
      <Form className={s.searchForm} onSubmit={handleSubmit}>
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
          value={imageSearch}
          onChange={handleNameChange}
        />
        <div className={s.cylonEye}></div>
      </Form>
    </SearchMenu>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
