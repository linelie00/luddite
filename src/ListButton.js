import React from 'react';
import styled from 'styled-components';
import listIcon from './listIcon.svg';

const ButtonContainer = styled.div`
    left: 92.5%;
    top: 20px;
    position: absolute;

    @media screen and (max-width: 1000px) {
        left: 90%;
      }
    @media screen and (max-width: 800px) {
        left: 89%;
    }
`;

const ToggleButton = styled.button`
    width: 26px;
    height: 30px;
    background-image: url(${listIcon});
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