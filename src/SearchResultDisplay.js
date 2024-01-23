// SearchResultDisplay.js
import React, { useState } from 'react';
import Bookmarks from './Bookmarks';
import FilterHangulWords from './FilterHangulWords'; // 새로 추가

const SearchResultDisplay = ({ searchResult, loading, error }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmarkClick = (word) => {
    const isBookmarked = bookmarks.includes(word);

    if (isBookmarked) {
      // 이미 북마크되어 있으면 제거
      setBookmarks(bookmarks.filter(bookmark => bookmark !== word));
    } else {
      // 북마크 추가 전개연산자
      setBookmarks([word, ...bookmarks]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if searchResult and pos1 or pos27 are defined
  const pos1Results = searchResult?.pos1?.channel?.item;
  const pos27Results = searchResult?.pos27?.channel?.item;

  // Filter results with more than 2 syllables
  const filteredPos1Results = FilterHangulWords({ items: pos1Results });
  const filteredPos27Results = FilterHangulWords({ items: pos27Results });

  // Render result item with Bookmark button
  const renderResultItem = (item, index) => {
    // 수정된 단어를 생성
    const modifiedWord = item.word.replace(/[-]/g, '');

    return (
      <div key={index}>
        <h3>{modifiedWord}</h3>
        {/* 북마크 버튼 */}
        <button onClick={() => handleBookmarkClick(modifiedWord)}>
          {bookmarks.includes(modifiedWord) ? '북마크 해제' : '북마크'}
        </button>
        {/* 뜻을 표시하는 부분 */}
        {item.sense.map((meaning, senseIndex) => (
          <div key={senseIndex}>
            <p>뜻: {meaning.definition}</p>
            <p>품사: {meaning.pos}</p>
            {/* 필요한 경우 더 많은 정보 추가 */}
            <a href={meaning.link} target="_blank" rel="noopener noreferrer">
              더 알아보기
            </a>
          </div>
        ))}
      </div>
    );
  };

  // Render bookmarks
  const renderBookmarks = () => {
    if (!bookmarks || bookmarks.length === 0) {
      return <div></div>;
    }
    return <Bookmarks bookmarks={bookmarks} />;
  };

  return (
    <div>
      {/* 북마크 목록 표시 */}
      {renderBookmarks()}
    
      {/* 검색 결과 표시 */}
      {filteredPos1Results.map(renderResultItem)}
      {filteredPos27Results.map(renderResultItem)}

      {(!filteredPos1Results || filteredPos1Results.length === 0) && (!filteredPos27Results || filteredPos27Results.length === 0) && (
        <div>결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResultDisplay;
