import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 10px;
  left: 100px;
  cursor: pointer;

  > .toggle-container {
    width: 147px;
    height: 50px;
    border-radius: 100px;
    background-color: #eeeeee;
    // .toggle--checked 클래스가 각각의 상태에 따라 다르게 적용되도록 수정
    &.toggle--0 {
      background-color: #e9e9e9;
    }
    &.toggle--1 {
      background-color: #B89DAF;
    }
    &.toggle--2 {
      background-color: #864971;
    }
    // transition 속성 추가
    transition: background-color 0.5s ease-in-out;
    
  }

  > .toggle-circle {
    position: absolute;
    top: 3px;
    left: 10px;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    background-color: #864971;
    // .toggle--checked 클래스가 각각의 상태에 따라 다르게 적용되도록 수정
    &.toggle--0 {
      left: 5px;
      background-color: #864971;
    }
    &.toggle--1 {
      left: 50px;
      background-color: #864971;
    }
    &.toggle--2 {
      left: 99px;
      background-color: #e9e9e9;
    }
    // transition 속성 추가
    transition: left 0.5s ease-in-out, background-color 0.5s ease-in-out;
  }
`;

const Toggle = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleHandler = () => {
    setToggleState((toggleState + 1) % 3);
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-container toggle--${toggleState}`} />
        <div className={`toggle-circle toggle--${toggleState}`} />
      </ToggleContainer>

    </>
  );
};

export default Toggle;
