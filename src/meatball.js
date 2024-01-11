// meatball.js

import React, { useState } from 'react';
import styled from 'styled-components';
import meatballIcon from './meatballIcon.svg';

const Container = styled.div`
    position: relative;
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: -55px;
    left: 95%;
    z-index: 2; /* 버튼을 상위로 올림 */
`;

const CreatedDivContainer = styled.div`
    position: absolute;
    left: 0;
    z-index: 1; /* 새로운 Div를 상위로 올림 */
`;

const CreatedDiv = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    width: 100px;
    height: 100px;
    background-color: lightblue;
    margin: 10px;
    text-align: center;
    line-height: 100px;
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

const MeatballComponent = () => {
    const [divVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!divVisible);
    };

    return (
        <Container>
            <ButtonContainer>
                <ToggleButton onClick={toggleDiv} className={divVisible ? 'rotate' : ''} />
            </ButtonContainer>
            <CreatedDivContainer>
                <CreatedDiv visible={divVisible}>새로운 Div</CreatedDiv>
            </CreatedDivContainer>
        </Container>
    );
};

export default MeatballComponent;
