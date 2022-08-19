import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { requestFetch } from 'components/services/fetch-pictures';

export class ImageGallery extends React.Component {
  state = {
    arrayOfPictures: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    imageTag: '',
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (url, tags) => {
    this.setState({ largeImageURL: url, imageTag: tags });

    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageSearch;
    const nextName = this.props.imageSearch;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1 });

      requestFetch(nextName, 1)
        .then(object => {
          if (object.hits.length === 0) {
            this.setState({ status: 'rejected' });
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.setState(() => ({
            arrayOfPictures: object.hits,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      requestFetch(nextName, this.state.page + 1).then(object => {
        this.setState(prevState => {
          return {
            arrayOfPictures: [...prevState.arrayOfPictures, ...object.hits],
          };
        });
      });
    }
  }
  render() {
    const { status, arrayOfPictures, showModal, largeImageURL, imageTag } =
      this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {arrayOfPictures.map(
              ({ id, tags, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  tags={tags}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  onClick={this.onOpenModal}
                />
              )
            )}
            {showModal && (
              <Modal
                src={largeImageURL}
                tags={imageTag}
                onCloseModal={this.modalToggle}
              />
            )}
          </Gallery>
          {arrayOfPictures.length % 12 === 0 &&
            arrayOfPictures.length !== 0 && (
              <Button onLoadMore={this.onLoadMore} />
            )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  imageSearch: PropTypes.string.isRequired,
};
