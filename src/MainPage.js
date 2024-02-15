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
  const { isLoggedIn, userId } = useAuth(); // useAuth hook으로부터 login 함수를 가져옴
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


  const toggleDiv = () => {
    setDivVisible(!divVisible);
  };

  const handleButtonClick = () => {};

  const handleToggle = () => {
    setToggleState((prevToggleState) => (prevToggleState + 1) % 2);
  };

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태일 때만 로컬스토리지에서 북마크 데이터 가져옴
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      setBookmarks(storedBookmarks || []);
    }
  }, [isLoggedIn]);

  const updateBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    if (isLoggedIn) {
      // 로그인 상태일 때만 백엔드 호출하여 북마크 업데이트
      updateBookmarksToBackend(userId, newBookmarks);
    }
  };

  const updateBookmarksToBackend = async (userId, bookmarksArray) => {
    try {
      // 백엔드로 요청할 엔드포인트와 데이터 설정
      const endpoint = `http://localhost:8282/use/updateBookmarks`;
      const requestData = {
        id: userId,
        bookmarks: bookmarksArray,
      };
  
      // 백엔드에 요청 보내기
      const response = await axios.post(endpoint, requestData);
  
      // 요청이 성공하면 성공 메시지 출력
      console.log(response.data.message);
    } catch (error) {
      // 요청이 실패하면 에러 출력
      console.error('북마크 업데이트 실패:', error.message);
    }
  };

  const handleLogout = () => {
    setBookmarks([]); // 로그아웃 시 북마크 상태를 빈 배열로 초기화
  };

  return (
    <div>
      <Head>
        <HeadTop>
          <HeaderIcon />
          <ListButton />
              <UserButton onLogout={handleLogout} />
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
