import React, { useState, useEffect } from 'react';
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
import { Head, HeadTop, HeadBottom, HeadBottom1, HeadBottom2, Divider, Mid, BookmarkListDiv, Blank, HeaderIcon } from './StyledComponents';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const MainPage = () => {
  const { login } = useAuth(); // useAuth hook으로부터 login 함수를 가져옴
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

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = (bookmarksData) => {
    setBookmarks(bookmarksData); // 서버에서 받아온 북마크 데이터를 상태에 설정
  };

  useEffect(() => {
    // 로컬스토리지에서 북마크 배열을 가져와서 설정
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (storedBookmarks) {
      setBookmarks(storedBookmarks);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행하도록 []를 두 번째 매개변수로 전달

  return (
    <div>
      <Head>
        <HeadTop>
          <HeaderIcon />
          <ListButton />
              <UserButton onLoginSuccess={handleLoginSuccess} /> {/* 로그인 성공 시에 handleLoginSuccess 함수 호출 */}
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
