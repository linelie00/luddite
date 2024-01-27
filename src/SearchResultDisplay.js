// SearchResultDisplay.js
import React, { useState } from 'react';
import Bookmarks from './Bookmarks';
import FilterHangulWords from './FilterHangulWords';
import { ResultItemContainer, ClipboardAlert } from './StyledComponents';
import emptystarIcon from './emptystarIcon.svg';
import fullstarIcon from './fullstarIcon.svg';
import copyIcon from './copyIcon.svg';
import copy from 'copy-to-clipboard';

const SearchResultDisplay = ({ searchResult, loading, error, bookmarks, updateBookmarks }) => {
  // State for clipboard alert
  const [clipboardAlert, setClipboardAlert] = useState(null);

  const handleBookmarkClick = (word) => {
    const isBookmarked = bookmarks.includes(word);

    if (isBookmarked) {
      updateBookmarks(bookmarks.filter(bookmark => bookmark !== word));
    } else {
      updateBookmarks([word, ...bookmarks]);
    }
  };

  const removeHtmlTagsAndString = (htmlString, stringToRemove) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    let textContent = doc.body.textContent || "";
    textContent = textContent.replace(stringToRemove, '');
    textContent = textContent.replace(/<FL>|<\/FL>|<DR \/>/g, '');
    return textContent;
  };

  const handleCopyToClipboard = (word) => {
    copy(word);
    setClipboardAlert('클립보드에 복사되었습니다.');

    setTimeout(() => {
      setClipboardAlert(null);
    }, 1000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pos1Results = searchResult?.pos1?.channel?.item;
  const pos27Results = searchResult?.pos27?.channel?.item;

  const renderResultItem = (item, index) => {
    const modifiedWord = item.word.replace(/-/g, '');

    return (
      <ResultItemContainer key={index}>
        <button className="bookmarkButton" onClick={() => handleBookmarkClick(modifiedWord)}>
          {bookmarks.includes(modifiedWord) ? (
            <img src={fullstarIcon} alt="Full Star" />
          ) : (
            <img src={emptystarIcon} alt="Empty Star" />
          )}
        </button>
        <button className="copyButton" onClick={() => handleCopyToClipboard(modifiedWord)}>
          <img src={copyIcon} alt="Copy to Clipboard" />
        </button>
        <h3>{modifiedWord}</h3>
        <div className="meaningDiv">
          {item.sense.map((meaning, senseIndex) => (
            <div key={senseIndex}>
              <p>: {removeHtmlTagsAndString(meaning.definition, '<FL>')}</p>
              <a href={meaning.link} target="_blank" rel="noopener noreferrer">
                더 알아보기
              </a>
            </div>
          ))}
        </div>
      </ResultItemContainer>
    );
  };

  const filteredPos1Results = FilterHangulWords({ items: pos1Results });
  const filteredPos27Results = FilterHangulWords({ items: pos27Results });

  return (
    <div>
      {clipboardAlert && <ClipboardAlert>{clipboardAlert}</ClipboardAlert>}
      {filteredPos1Results.map(renderResultItem)}
      {filteredPos27Results.map(renderResultItem)}

      {(!filteredPos1Results || filteredPos1Results.length === 0) &&
        (!filteredPos27Results || filteredPos27Results.length === 0) && (
          <div>결과가 없습니다.</div>
        )}

      
    </div>
  );
};

export default SearchResultDisplay;
