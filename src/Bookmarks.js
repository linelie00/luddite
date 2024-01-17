// Bookmarks.js
import React from 'react';

const Bookmarks = ({ bookmarks }) => {
  return (
    <div>
      <h2>북마크 목록</h2>
      {bookmarks.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
};

export default Bookmarks;
