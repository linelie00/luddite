// App.js
import React, { useState } from 'react';
import Toggle from './toggle.js';
import PillTextBox from './search.js';
import MeatballButton from './MeatballButton';
import MeatballDiv from './MeatballDiv';
import useSearch from './useSearch';
import SearchResultDisplay from './SearchResultDisplay';
import Bookmarks from './Bookmarks';
import ChevronsButton from './ChevronsButton';
import SearchText from './SearchText.js';
import {
  Head,
  HeadTop,
  HeadBottom,
  HeadBottom1,
  HeadBottom2,
  Divider,
  Mid,
  BookmarkListDiv,
  Blank,
  HeaderIcon,
} from './StyledComponents';

const App = () => {
  const {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
    handleKeyDown,
  } = useSearch();

  const [bookmarks, setBookmarks] = useState([]);

  const updateBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
  };

  const [divVisible, setDivVisible] = useState(false);

  const toggleDiv = () => {
    setDivVisible(!divVisible);
  };

  const handleButtonClick = () => {
  };

  return (
    <div>
      <SearchText />
      <Head>
        <HeadTop>
          <HeaderIcon />
        </HeadTop>
        <HeadBottom>
          <HeadBottom1>
            <PillTextBox
              value={searchValue}
              onChange={handleChange}
            />
            <Toggle />
          </HeadBottom1>
          <Divider></Divider>
          <HeadBottom2>
            <BookmarkListDiv id="BookmarkListDiv">
              <Bookmarks bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
              <Blank></Blank>
            </BookmarkListDiv>
            <ChevronsButton onButtonClick={handleButtonClick} />
            <MeatballButton onClick={toggleDiv} isRotated={divVisible} />
          </HeadBottom2>
        </HeadBottom>
      </Head>
      <MeatballDiv isVisible={divVisible} bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
      <Mid>
        <SearchResultDisplay
          searchResult={searchResult}
          loading={loading}
          error={error}
          bookmarks={bookmarks}
          updateBookmarks={updateBookmarks}
        />
      </Mid>
    </div>
  );
};

export default App;
