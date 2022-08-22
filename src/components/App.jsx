import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { App } from 'components/App.styled';

export function ImageFinder() {
  const [imageSearch, setImageSearch] = useState('');

  const hadleFornSubmit = imageSearch => {
    setImageSearch(imageSearch);
  };

  return (
    <App>
      <Searchbar onSubmit={hadleFornSubmit} />
      <ImageGallery imageSearch={imageSearch} />
      <ToastContainer autoclose={3000} />
    </App>
  );
}
