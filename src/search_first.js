import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-top: 10px;
  left: 50px;
  cursor: pointer;
  position: relative;
  width: 350px;
  height: 50px;
  align-items: center;
  padding: 0 15px;
  overflow: hidden;
  display: flex;
`;

const PillTextBoxContainer = styled.div`
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  width: 25px;
  height: 50px;
  border-radius: 25px;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const PillTextBoxInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 16px;
  margin-left: 2px;
  color: #864971;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextAbove = styled.div`
  text-align: center;
  color: #864971;
  margin-top: -3px;
  margin-left: 10px;
  margin-right: 15px;
`;

const PillTextBoxMod = () => {
  const [leftInputValue, setLeftInputValue] = useState('');
  const [rightInputValue, setRightInputValue] = useState('');

  const handleLeftInputChange = (e) => {
    setLeftInputValue(e.target.value);
  };

  const handleRightInputChange = (e) => {
    setRightInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('왼쪽 입력값:', leftInputValue);
      console.log('오른쪽 입력값:', rightInputValue);
    }
  };

  return (
    <InputContainer>
      <PillTextBoxContainer>
        <PillTextBoxInput
          type="text"
          placeholder=""
          value={leftInputValue}
          onChange={handleLeftInputChange}
          onKeyDown={handleKeyDown}
        />
      </PillTextBoxContainer>
      <TextAbove>
        <b>(으)로 시작</b>
      </TextAbove>
      <PillTextBoxContainer>
        <PillTextBoxInput
          type="text"
          placeholder=""
          value={rightInputValue}
          onChange={handleRightInputChange}
          onKeyDown={handleKeyDown}
        />
      </PillTextBoxContainer>
      <TextAbove>
        <b>(으)로 끝</b>
      </TextAbove>
    </InputContainer>
  );
};

export default PillTextBoxMod;
