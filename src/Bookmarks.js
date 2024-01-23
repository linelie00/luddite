// Bookmarks.js
import React, { useState } from 'react';
import styled from 'styled-components';

const BookmarksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BookmarkItem = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: grab; /* 드래그 핸들 설정 */
`;

const CircleIcon = styled.span`
  margin-right: 5px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #864971; /* 원하는 색상으로 변경하세요 */
  display: inline-block;
`;

const Bookmarks = ({ bookmarks, updateBookmarks }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex !== null) {
      // 현재 드래그 중인 아이템의 순서와 드래그 대상 아이템의 순서를 교환
      const updatedBookmarks = [...bookmarks];
      const draggedItem = updatedBookmarks[draggedIndex];

      updatedBookmarks.splice(draggedIndex, 1);
      updatedBookmarks.splice(index, 0, draggedItem);

      setDraggedIndex(index);
      // 여기서 업데이트된 순서를 상위 컴포넌트로 전달하거나 다른 작업을 수행할 수 있습니다.
      updateBookmarks(updatedBookmarks);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (!bookmarks || bookmarks.length === 0) {
    return <div></div>;
  }

  return (
    <BookmarksContainer>
      {bookmarks.map((word, index) => (
        <BookmarkItem
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          <CircleIcon />
          {word}
        </BookmarkItem>
      ))}
    </BookmarksContainer>
  );
};

export default Bookmarks;
