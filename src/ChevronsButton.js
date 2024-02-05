// ChevronsButton.js
import React from 'react';
import styled from 'styled-components';
import chevronsIcon from './chevronsIcon.svg';

const ButtonContainer = styled.div`
  z-index: 18;
  left: 94%;
  position: absolute;

  @media screen and (max-width: 1000px) {
    left: 90%;
  }
  @media screen and (max-width: 800px) {
    left: 89%;
  }
`;

const ToggleButton = styled.button`
  width: 35px;
  height: 35px;
  background-image: url(${chevronsIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  cursor: pointer;
  transition: transform 0.5s;
  background-color: transparent;
`;

const ChevronsButton = ({ onButtonClick }) => {
    const handleClick = () => {
        if (onButtonClick) {
          onButtonClick(); // 외부에서 전달된 함수 실행
        }
      
        const bookmarkListDiv = document.getElementById('BookmarkListDiv');
        if (bookmarkListDiv) {
          const scrollAmount = 500;
          const currentScroll = bookmarkListDiv.scrollLeft;
          const newScroll = currentScroll + scrollAmount;
      
          if (newScroll >= bookmarkListDiv.scrollWidth - bookmarkListDiv.clientWidth) {
            // 스크롤이 끝까지 도달하면 끝까지 스크롤만 함
            const handleScroll = () => {
              // 스크롤이 끝까지 도달한 후 한 번 더 클릭하면 처음으로 돌아감
              bookmarkListDiv.scrollTo({
                left: 0,
                behavior: 'smooth',
              });
              bookmarkListDiv.removeEventListener('scroll', handleScroll);
            };
      
            bookmarkListDiv.addEventListener('scroll', handleScroll, { once: true });
      
            bookmarkListDiv.scrollTo({
              left: bookmarkListDiv.scrollWidth,
              behavior: 'smooth',
            });
          } else {
            // 스크롤이 끝까지 도달하지 않으면 스크롤한 후 다음 클릭 시 처음으로 돌아감
            bookmarkListDiv.scrollTo({
              left: newScroll,
              behavior: 'smooth',
            });
          }
        }
      };

  return (
    <ButtonContainer>
      <ToggleButton onClick={handleClick} />
    </ButtonContainer>
  );
};

export default ChevronsButton;
