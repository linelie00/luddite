import React, { useState } from 'react';
import styled from 'styled-components';
import useApiSearch from './useApiSearch';
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
`;

const PillTextBoxInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 18px;
  font-weight: 600;
  margin-left: 3px;
  color: #e9e9e9;
  &::placeholder {
    color: #b89daf;
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

const Search = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const { searchResult, loading, error } = useApiSearch(inputValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value); // 부모 컴포넌트에 변경사항 알림
  };

  return (
    <PillTextBoxContainer>
      <PillTextBoxInput
        type="text"
        id="input"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchIcon src={searchIcon} alt="Search" />
    </PillTextBoxContainer>
  );
};

export default Search;
