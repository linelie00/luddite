import React, { useState } from 'react';

const SearchResultDisplay = ({ searchResult, loading, error }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmarkClick = (word) => {
    const isBookmarked = bookmarks.includes(word);

    if (isBookmarked) {
      // 이미 북마크되어 있으면 제거
      setBookmarks(bookmarks.filter(bookmark => bookmark !== word));
    } else {
      // 북마크 추가
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

  // Function to filter and process results
  const processResults = (items) => {
    if (!items || items.length === 0) {
      return [];
    }

    // 잘못된 문자가 있는 결과를 필터링
    const filteredResults = items.filter(item => !item.word?.includes('') && !item.word?.includes('^') && !item.word?.includes('') && !item.word?.includes(''));

    // 단어가 같은 경우에 처음 나온 단어만 보이도록 필터링
    const uniqueResults = filteredResults.reduce((uniqueResults, item) => {
      const isDuplicate = uniqueResults.some(result => result.word === item.word);
      if (!isDuplicate) {
        uniqueResults.push(item);
      }
      return uniqueResults;
    }, []);

    return uniqueResults;
  };

  // HTML 태그 및 특정 문자열 제거 함수
  const removeHtmlTagsAndString = (htmlString, stringToRemove) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    let textContent = doc.body.textContent || "";
    // 특정 문자열 제거
    textContent = textContent.replace(stringToRemove, '');
    return textContent;
  };

 // 정규식을 사용하여 한글 음절이 아닌 문자를 필터링하는 함수
  const filterNonHangulMeanings = (sense) => {
    return sense.filter(meaning => /[가-힣]{2,}/.test(removeHtmlTagsAndString(meaning.definition, '&lt;/FL&gt;')));
  };

   // Render result item with Bookmark button
   const renderResultItem = (item, index) => {
    // '-' 및 '^' 문자를 제거하여 수정된 단어를 생성
    const modifiedWord = item.word.replace(/[-]/g, '');

    return (
      <div key={index}>
        <h3>{modifiedWord}</h3>
        {/* 북마크 버튼 */}
        <button onClick={() => handleBookmarkClick(modifiedWord)}>
          {bookmarks.includes(modifiedWord) ? '북마크 해제' : '북마크'}
        </button>
        {/* 뜻을 표시하는 부분 */}
        {filterNonHangulMeanings(item.sense).map((meaning, senseIndex) => (
          <div key={senseIndex}>
            <p>뜻: {removeHtmlTagsAndString(meaning.definition, '&lt;/FL&gt;')}</p>
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
    return (
      <div>
        <h2>북마크 목록</h2>
        {bookmarks.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* 북마크 목록 표시 */}
      {renderBookmarks()}
      
      {/* 검색 결과 표시 */}
      {processResults(pos1Results).map(renderResultItem)}
      {processResults(pos27Results).map(renderResultItem)}

      {(!pos1Results || pos1Results.length === 0) && (!pos27Results || pos27Results.length === 0) && (
        <div>결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResultDisplay;