// MainPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toggle from './MethodToggle.js';
import PillTextBox from './search.js';
import MeatballButton from './MeatballButton';
import MeatballDiv from './MeatballDiv';
import useSearch from './useSearch';
import SearchResultDisplay from './SearchResultDisplay';
import Bookmarks from './Bookmarks';
import ChevronsButton from './ChevronsButton';
import ListButton from './ListButton';
import UserButton from './UserButton';
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

const MainPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [divVisible, setDivVisible] = useState(false);
  const [toggleState, setToggleState] = useState(0);

  const {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
  } = useSearch({ method: toggleState === 0 ? 'start' : 'end' });

  const updateBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
  };

  const toggleDiv = () => {
    setDivVisible(!divVisible);
  };

  const handleButtonClick = () => {};

  const handleToggle = () => {
    setToggleState((prevToggleState) => (prevToggleState + 1) % 2);
  };

  return (
    <div>
      <Head>
        <HeadTop>
          <HeaderIcon />
          <ListButton />
          <Link to="/login">
            <UserButton />
          </Link>
        </HeadTop>
        <HeadBottom>
          <HeadBottom1>
            <PillTextBox value={searchValue} onChange={handleChange} />
            <Toggle onToggle={handleToggle} />
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

export default MainPage;
