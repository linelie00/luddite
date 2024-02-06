import React, { useState } from 'react';
import FilterHangulWords from './FilterHangulWords';
import { ResultItemContainer, ClipboardAlert } from './StyledComponents';
import emptystarIcon from './emptystarIcon.svg';
import fullstarIcon from './fullstarIcon.svg';
import copyIcon from './copyIcon.svg';
import copy from 'copy-to-clipboard';

const SearchResultDisplay = ({ searchResult, loading, error, bookmarks, updateBookmarks }) => {
  const [clipboardAlert, setClipboardAlert] = useState(null);

  const handleBookmarkClick = (word) => {
    const isBookmarked = bookmarks.includes(word);

    if (isBookmarked) {
      updateBookmarks(bookmarks.filter(bookmark => bookmark !== word));
    } else {
      updateBookmarks([word, ...bookmarks]);
    }
  };

  const removeHtmlTagsAndString = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    let textContent = doc.body.textContent || "";
    // <FL> 및 </FL> 문자열 제거
    textContent = textContent.replace(/<FL>|<\/FL>|<DR \/>|<\/sub>|<sub>/g, '');
    return decodeEntities(textContent);
  };

  const decodeEntities = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleCopyToClipboard = (word) => {
    // '-' 및 '^' 문자를 제거한 후 클립보드에 복사
    const modifiedWord = word.replace(/[-^]/g, '');
    copy(modifiedWord);
    
    setClipboardAlert('클립보드에 복사되었습니다');
  
    setTimeout(() => {
      setClipboardAlert(null);
    }, 1000);
  };

  const pos1Results = searchResult?.pos1?.channel?.item || [];
  const pos27Results = searchResult?.pos27?.channel?.item || [];

  const renderResultItem = (item, index) => {
    const modifiedWord = item.word.replace(/[-^]/g, '');
  
    return (
      <ResultItemContainer key={index}>
        <button className="bookmarkButton" onClick={() => handleBookmarkClick(item.word)}>
          {bookmarks.includes(item.word) ? (
            <img src={fullstarIcon} alt="Full Star" />
          ) : (
            <img src={emptystarIcon} alt="Empty Star" />
          )}
        </button>
        <button className="copyButton" onClick={() => handleCopyToClipboard(item.word)}>
          <img src={copyIcon} alt="Copy to Clipboard" />
        </button>
        <h3>{modifiedWord}</h3>
        <div className="meaningDiv">
          {item.sense.map((meaning, senseIndex) => (
            <div key={senseIndex}>
              <p>: {removeHtmlTagsAndString(meaning.definition)}</p>
              <a href={meaning.link} target="_blank" rel="noopener noreferrer">
                더 알아보기
              </a>
            </div>
          ))}
        </div>
      </ResultItemContainer>
    );
  };

  const filteredPos1Results = FilterHangulWords({ items: pos1Results.filter(item => !bookmarks.includes(item.word)) });
  const filteredPos27Results = FilterHangulWords({ items: pos27Results.filter(item => !bookmarks.includes(item.word)) });

  const renderBookmarks = () => {
    if (!bookmarks || bookmarks.length === 0) {
      return <div></div>;
    }

    return (
      <div>
        {bookmarks.map((bookmark, index) => {
          const bookmarkedItem = pos1Results.find(item => item.word === bookmark) || pos27Results.find(item => item.word === bookmark);
          return bookmarkedItem && renderResultItem(bookmarkedItem, index);
        })}
      </div>
    );
  };

  
  return (
    <div>
      {clipboardAlert && <ClipboardAlert>{clipboardAlert}</ClipboardAlert>}

      {renderBookmarks()}

      {filteredPos1Results.map((item, index) => renderResultItem(item, index))}
      {filteredPos27Results.map((item, index) => renderResultItem(item, index))}

      {(pos1Results.length === 0 && pos27Results.length === 0) && (
      <div>결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResultDisplay;