import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from 'Services/SearchDataApi';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import ErrorFetch from '../ErrorFetch';
import Modal from '../Modal';
import Loader from '../Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};

const BASE_URL = 'https://pixabay.com/api/';
const PAGE_SIZE = 12;
const API_KEY = '38758565-30dff5e0c8e04bcbf19e28f96';

const ImageGallery = ({ searchText, page, handleClick }) => {

  const [searchResults, setSearchResults] = useState([]);
  const [currentTotalHits, setCurrentTotalHits] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largePicture, setLargePicture] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // const isFirstLoad = useRef(true);

  
  useEffect(() => {
    const fetchText = searchText;
    const fetchPage = page;

    if (isFirstLoad) {
      setSearchResults([]);
      setCurrentTotalHits(0);
      setIsFirstLoad(false);
      return;
    }

    setStatus(Status.PENDING);

    API.fetchData(fetchText, BASE_URL, fetchPage, PAGE_SIZE, API_KEY)
      .then(response => {
        const { hits, totalHits } = response;
        if (totalHits > 0) {
          page === 1
            ? setSearchResults([...hits])
            : setSearchResults(prevState => [...prevState, ...hits]);
          setCurrentTotalHits(totalHits);
          setStatus(Status.RESOLVED);
          return;
        }
        setSearchResults([]);
        setError(`Nothing was found for request <${searchText}>`);
        setStatus(Status.REJECTED);
      })
      .catch(error => {
        setSearchResults([]);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [isFirstLoad, page, searchText]);

  useEffect(() => {
    toScrollPos();
  }, [searchResults]);

  const nextPage = page => {
    handleClick(page + 1);
  };

  const selectedItemView = curentLargePicture => {
    setLargePicture(curentLargePicture);
    toggleModal();
  };

  const toScrollPos = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const statusСheck = () => {
    return status === 'resolved' && searchResults.length < currentTotalHits
      ? Status.RESOLVED
      : Status.RESOLVED_NO_BUTTON;
  };

  return (
    <div className={css.galleryContainer}>
      <ul className={css.ImageGallery}>
        {searchResults.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            webformatURL={webformatURL}
            tags={tags}
            id={id}
            onSelectedItemView={selectedItemView}
            key={id}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>

      {status === 'pending' && <Loader />}
      {statusСheck() === 'resolved' && (
        <Button page={page} onNextPage={nextPage} />
      )}
      {showModal && (
        <Modal largePicture={largePicture} onToggleModal={toggleModal} />
      )}
      {status === 'rejected' && <ErrorFetch massage={error} />}
    </div>
  );
};

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
  // handleClick: PropTypes.func.isRequired,
  // page: PropTypes.number.isRequired,
};

export default ImageGallery;
