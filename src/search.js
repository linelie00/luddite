// PillTextBox.js
import React from 'react';
import styled from 'styled-components';
import searchIcon from './search.png';

const PillTextBoxContainer = styled.div`
  margin-top: 10px;
  left: 17%;
  cursor: pointer;
  position: relative;
  width: 470px;
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
  font-size: 16px;
  margin-left: 4px;
  color: #e9e9e9;
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

const PillTextBox = ({ value, onChange, onEnter }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter && onEnter();
    }
  };

  return (
    <PillTextBoxContainer>
      <PillTextBoxInput
        type="text"
        placeholder=""
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon src={searchIcon} alt="Search" />
    </PillTextBoxContainer>
  );
};

export default PillTextBox;
