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
import {
  Head,
  HeadTop,
  HeadBottom,
  HeadBottom1,
  HeadBottom2,
  Divider,
  Mid,
  BookmarkListDiv,
} from './StyledComponents';

const App = () => {
  const {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
    handleSearchClick,
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

  const [scrollOffset, setScrollOffset] = useState(0);

  const handleButtonClick = () => {
    // 버튼을 눌렀을 때 스크롤을 일정 픽셀만큼 이동 또는 처음으로 돌아오기
    const newOffset = (scrollOffset + 200) % 400;
    setScrollOffset(newOffset);
    console.log("버튼클릭");
  };

  return (
    <div>
      <Head>
        <HeadTop></HeadTop>
        <HeadBottom>
          <HeadBottom1>
            <PillTextBox
              value={searchValue}
              onChange={handleChange}
              onEnter={handleKeyDown}
            />
            <Toggle />
          </HeadBottom1>
          <Divider></Divider>
          <HeadBottom2>
            <BookmarkListDiv>
              <Bookmarks bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
            </BookmarkListDiv>
            <ChevronsButton onButtonClick={handleButtonClick} />
            <MeatballButton onClick={toggleDiv} isRotated={divVisible} />
          </HeadBottom2>
        </HeadBottom>
      </Head>
      <MeatballDiv isVisible={divVisible} bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
      <Mid>
        <b>{searchValue}</b>
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
