import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 6px;
  right: -5%;
  cursor: pointer;

  > .toggle-container {
    width: 136px;
    height: 44px;
    border-radius: 100px;
    background-color: #e9e9e9;
    border-style: solid;
    border-color: #864971;
    border-width: 3.5px;
    // .toggle--checked 클래스가 각각의 상태에 따라 다르게 적용되도록 수정
    &.toggle--0 {
      background-color: #e9e9e9;
    }
    &.toggle--1 {
      background-color: #e9e9e9;
    }
    &.toggle--2 {
      background-color: #e9e9e9;
    }
    // transition 속성 추가
    transition: background-color 0.5s ease-in-out;
    
  }

  > .toggle-circle {
    position: absolute;
    top: 7px;
    left: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #B89DAF;
    border-style: solid;
    border-color: #864971;
    border-width: 3.5px;
    // .toggle--checked 클래스가 각각의 상태에 따라 다르게 적용되도록 수정
    &.toggle--0 {
      left: 8px;
      background-color: #B89DAF;
    }
    &.toggle--1 {
      left: 53px;
      background-color: #B89DAF;
    }
    &.toggle--2 {
      left: 98px;
      background-color: #B89DAF;
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
