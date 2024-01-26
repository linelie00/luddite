// SearchResultDisplay.js
import React, { useState } from 'react';
import Bookmarks from './Bookmarks';
import FilterHangulWords from './FilterHangulWords';
import { ResultItemContainer } from './StyledComponents';
import emptystarIcon from './emptystarIcon.svg';
import fullstarIcon from './fullstarIcon.svg';

const SearchResultDisplay = ({ searchResult, loading, error, bookmarks, updateBookmarks }) => {
  const handleBookmarkClick = (word) => {
    const isBookmarked = bookmarks.includes(word);

    if (isBookmarked) {
      // 이미 북마크되어 있으면 제거
      updateBookmarks(bookmarks.filter(bookmark => bookmark !== word));
    } else {
      // 북마크 추가
      updateBookmarks([word, ...bookmarks]);
    }
  };

  const removeHtmlTagsAndString = (htmlString, stringToRemove) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    let textContent = doc.body.textContent || "";
    // 특정 문자열 제거
    textContent = textContent.replace(stringToRemove, '');
    // <FL> 및 </FL> 문자열 제거
    textContent = textContent.replace(/<FL>|<\/FL>/g, '');
    return textContent;
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

  // Render result item with Bookmark button
  const renderResultItem = (item, index) => {
    // 수정된 단어를 생성 (여기서 '-' 제거)
    const modifiedWord = item.word.replace(/-/g, '');

    return (
      <ResultItemContainer key={index}>
        
        {/* 북마크 버튼 */}
        <button onClick={() => handleBookmarkClick(modifiedWord)}>
          {bookmarks.includes(modifiedWord) ? (
            <img src={fullstarIcon} alt="Full Star"/>
            ) : (
            <img src={emptystarIcon} alt="Empty Star"/>
          )}
        </button>
        {/* 단어를 표시하는 부분 */}
        <h3>{modifiedWord}</h3>
        {/* 뜻을 표시하는 부분 */}
        <div className="meaningDiv">
        {item.sense.map((meaning, senseIndex) => (
          <div key={senseIndex}>
            <p>: {removeHtmlTagsAndString(meaning.definition, '<FL>')}</p>
            {/*<p>품사: {meaning.pos}</p>*/}
            {/* 필요한 경우 더 많은 정보 추가 */}
            <a href={meaning.link} target="_blank" rel="noopener noreferrer">
              더 알아보기
            </a>
          </div>
        ))}
        </div>
      </ResultItemContainer>
    );
  };

  // Filter results with more than 2 syllables
  const filteredPos1Results = FilterHangulWords({ items: pos1Results });
  const filteredPos27Results = FilterHangulWords({ items: pos27Results });

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
      {/* renderBookmarks() */}
    
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
