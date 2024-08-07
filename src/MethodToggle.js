import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 6px;
  right: -4%;
  cursor: pointer;

  > .toggle-container {
    width: 90px;
    height: 44px;
    border-radius: 100px;
    background-color: ${({ toggleState }) => (toggleState === 0 ? '#e9e9e9' : '#AD839F')};
    border-style: solid;
    border-color: ${({ toggleState }) => (toggleState === 0 ? '#864971' : '#864971')};
    border-width: 3.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background-color 0.5s ease-in-out;
    font-size: 20px;
    color: ${({ toggleState }) => (toggleState === 0 ? '#864971' : '#e9e9e9')};
    user-select: none;
    font-weight: 600;
  }
`;

const Toggle = ({ onToggle }) => {
  const [toggleState, setToggleState] = useState(0);

  const toggleHandler = () => {
    setToggleState((prevToggleState) => (prevToggleState + 1) % 2);
    // Call different methods based on toggleState
    onToggle(toggleState === 0 ? 'start' : 'end');
  };

  return (
    <ToggleContainer onClick={toggleHandler} toggleState={toggleState}>
      <div className="toggle-container">
        <div className="toggle-text">
          {toggleState === 0 ? '시작' : '끝'}
        </div>
      </div>
    </ToggleContainer>
  );
};

export default Toggle;