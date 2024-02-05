import React from 'react';
import styled from 'styled-components';
import userIcon from './userIcon.svg';

const ButtonContainer = styled.div`
    left: 95%;
    top: 20px;
    position: absolute;

    @media screen and (max-width: 1000px) {
        left: 94%;
    }
`;

const ToggleButton = styled.button`
    width: 30px;
    height: 30px;
    background-image: url(${userIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    border: none;
    cursor: pointer;
    transition: transform 0.5s;
    background-color: transparent;
`;

const ListButton = ({ onClick }) => {
    return (
        <ButtonContainer>
            <ToggleButton onClick={onClick} />
        </ButtonContainer>
    );
};

export default ListButton;