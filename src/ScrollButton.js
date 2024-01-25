// ScrollButton.js

import React from 'react';

const ScrollButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // 페이지 상단으로 이동
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToTop} style={buttonStyle}>
      스크롤
    </button>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px',
  fontSize: '16px',
};

export default ScrollButton;
