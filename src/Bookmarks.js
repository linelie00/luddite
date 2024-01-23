// Bookmarks.js
import React from 'react';

const Bookmarks = ({ bookmarks }) => {
    if (!bookmarks || bookmarks.length === 0) {
      return <div></div>;
    }
  
    return (
      <div>
        {bookmarks.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    );
  };

export default Bookmarks;
