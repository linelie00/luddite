import styled from 'styled-components';
import React, { forwardRef } from 'react';

export const BookmarkListDiv = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
  display: flex;
  width: 92%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin: 0;
  /* 추가된 부분 */
  > * {
    flex-shrink: 0;
  }
  /* background-color: #333333; */
  &.scroll {
    overflow-x: auto; /* 가로 스크롤을 허용하도록 설정 */
  }

  /* 스크롤 바 숨기기 */
  &::-webkit-scrollbar {
    height: 0; /* 가로 스크롤 바의 높이를 0으로 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤 바 색상을 투명으로 설정 */
  }
`;

export default forwardRef((props, ref) => {
  return (
    <BookmarkListDiv id="BookmarkListDiv" ref={ref}>
      {props.children}
    </BookmarkListDiv>
  );
});
