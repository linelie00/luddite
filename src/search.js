// PillTextBox.js
import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from './searchIcon.svg';

const PillTextBoxContainer = styled.div`
  margin-top: 6px;
  left: 2%;
  cursor: pointer;
  position: relative;
  width: 60%;
  height: 50px;
  border-radius: 25px;
  background-color: #864971;
  display: flex;
  align-items: center;
  padding: 0 55px;
  @media screen and (max-width: 600px) {
    width: 50%;
  }
`;

const PillTextBoxInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 18px; /* 수정된 부분: 폰트 크기를 18px로 수정 */
  font-weight: 600;
  margin-left: 3px;
  color: #e9e9e9;
  &::placeholder { /* 수정된 부분: placeholder 스타일 추가 */
    color: #B89DAF;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const PillTextBox = ({ value, onChange }) => {

  return (
    <PillTextBoxContainer>
      <PillTextBoxInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={onChange}
      />
      <SearchIcon src={searchIcon} alt="Search" />
    </PillTextBoxContainer>
  );
};

export default PillTextBox;
