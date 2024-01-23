// RenderResultItem.js
import React from 'react';

const RenderResultItem = ({ item, handleBookmarkClick }) => {
  // 수정된 단어를 생성
  const modifiedWord = item.word.replace(/[-]/g, '');

  return (
    <div>
      <h3>{modifiedWord}</h3>
      {/* 북마크 버튼 */}
      <button onClick={() => handleBookmarkClick(modifiedWord)}>
        {bookmarks.includes(modifiedWord) ? '북마크 해제' : '북마크'}
      </button>
      {/* 뜻을 표시하는 부분 */}
      {FilterNonHangulMeanings(item.sense).map((meaning, senseIndex) => (
        <div key={senseIndex}>
          <p>뜻: {RemoveHtmlTagsAndString(meaning.definition, '&lt;/FL&gt;')}</p>
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

export default RenderResultItem;
