import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { requestFetch } from 'components/services/fetch-pictures';

export function ImageGallery({ imageSearch }) {
  const [arrayOfPictures, setArrayOfPictures] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageTag, setImageTag] = useState('');

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = (url, tags) => {
    setLargeImageURL(url);
    setImageTag(tags);

    modalToggle();
  };

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!imageSearch) {
      return;
    }
    setStatus('pending');

    requestFetch(imageSearch, 1)
      .then(object => {
        if (object.hits.length === 0) {
          setStatus('rejected');
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setArrayOfPictures(object.hits);
        setStatus('resolved');
      })
      .catch(error => setError(error));
  }, [imageSearch]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    requestFetch(imageSearch, page + 1).then(object => {
      setArrayOfPictures(ArrayOfPictures => [
        ...ArrayOfPictures,
        ...object.hits,
      ]);
    });
  }, [imageSearch, page]);

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <>
        <Gallery>
          {arrayOfPictures.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={onOpenModal}
            />
          ))}
          {showModal && (
            <Modal
              src={largeImageURL}
              tags={imageTag}
              onCloseModal={modalToggle}
            />
          )}
        </Gallery>
        {arrayOfPictures.length % 12 === 0 && arrayOfPictures.length !== 0 && (
          <Button onLoadMore={onLoadMore} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageSearch: PropTypes.string.isRequired,
};
