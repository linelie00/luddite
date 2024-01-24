// MeatballDiv.js

import React from 'react';
import styled from 'styled-components';
import Bookmarks from './Bookmarks';

const DivContainer = styled.div`
    position: absolute;
    width: 95%;
    left: 49.8%;
    margin: -60px auto;
    transform: translateX(-50%);
    z-index: 15; /* 새로운 Div를 상위로 올림 */
    box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
`;

const CreatedDiv = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    width: 95%;
    max-height: 200px;
    overflow-y: auto;
    margin: 0;
    text-align: left;
    padding: 0px;
    box-sizing: border-box;
    white-space: pre-wrap;
    margin-right: 300;
`;


const MeatballDiv = ({ isVisible, bookmarks, updateBookmarks }) => {
    return (
        <DivContainer>
            <CreatedDiv visible={isVisible}>
                <Bookmarks bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
            </CreatedDiv>
        </DivContainer>
    );
};

export default MeatballDiv;