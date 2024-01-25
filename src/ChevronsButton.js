import React from 'react';
import styled from 'styled-components';
import chevronsIcon from './chevronsIcon.svg';

const ButtonContainer = styled.div`
    z-index: 18; /* 버튼을 상위로 올림 */
    left: 94%;
    position: absolute;
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
    return (
        <ButtonContainer>
            <ToggleButton onClick={onButtonClick} />
        </ButtonContainer>
    );
};

export default ChevronsButton;
