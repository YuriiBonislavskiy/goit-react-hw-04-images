import  { useState } from 'react';
import PropTypes from 'prop-types';
// import Loader from '../Loader';
import Modal from '../Modal';
import css from './ImageGalleryItem.module.css';

// const ImageGalleryItem = ({ webformatURL, tags, id, onSelectedItemView, setLoading, curentTotalResults, index }) => {
const ImageGalleryItem = ({
  webformatURL,
  tags,
  id,
  largeImageURL,
}) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(prevState => !prevState);
    };

  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        className={css.ImageGalleryItemImage}
        alt={tags}
        onClick={() => {
          toggleModal(largeImageURL);
        }}
      />
      {showModal && (
        <Modal largePicture={largeImageURL} onToggleModal={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
