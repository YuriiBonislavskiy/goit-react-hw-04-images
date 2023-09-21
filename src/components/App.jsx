import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

const App = () => {
  const [searchText, setSearchText] = useState('');
  // const [page, setPage] = useState(1);

  const handleSubmit = text => {
      setSearchText(text);
      // setPage(1);
  };

//  const handleClick = (page) => {
//     setPage(page);
//   };


    return (
      <div>
        <Searchbar searchText={searchText} onHandleSubmit={handleSubmit} />
        {searchText && <ImageGallery
          searchText={searchText}
          // handleClick={handleClick}
          // page={page}
        />}
      </div>
    );
}

export default App;
