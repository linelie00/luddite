// MeatballButton.js

import React from 'react';
import styled from 'styled-components';
import meatballIcon from './meatballIcon.svg';

const ButtonContainer = styled.div`
    z-index: 20; /* 버튼을 상위로 올림 */
    left: 97%;
    position: absolute;

    @media screen and (max-width: 1000px) {
        left: 94%;
    }
`;

const ToggleButton = styled.button`
    width: 30px;
    height: 30px;
    background-image: url(${meatballIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    border: none;
    cursor: pointer;
    transition: transform 0.5s;
    background-color: transparent;

    &.rotate {
        transform: rotate(90deg);
    }
`;

const MeatballButton = ({ onClick, isRotated }) => {
    return (
        <ButtonContainer>
            <ToggleButton onClick={onClick} className={isRotated ? 'rotate' : ''} />
        </ButtonContainer>
    );
};

export default MeatballButton;
