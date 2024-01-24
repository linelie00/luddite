// MeatballDiv.js

import React from 'react';
import styled from 'styled-components';

const DivContainer = styled.div`
    position: absolute;
    width: 95%;
    left: 50%;
    margin: -60px auto; /* 수정: 가로로 중앙 정렬, 오른쪽은 auto로 유지 */
    margin-left: -3px; /* 수정: 왼쪽으로 3px 이동 */
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
    padding: 10px;
    box-sizing: border-box;
    white-space: pre-wrap;
    margin-right: auto;
`;


const MeatballDiv = ({ isVisible }) => {
    return (
        <DivContainer>
            <CreatedDiv visible={isVisible}>
                {/* 예시 텍스트 */}
                This is a sample text that will automatically wrap to the next line
                if it becomes too long vertically. It will also have a maximum height,
                and if the content exceeds that height, a scrollbar will appear.
                This is a sample text that will automatically wrap to the next line
                if it becomes too long vertically. It will also have a maximum height,
                and if the content exceeds that height, a scrollbar will appear.
                This is a sample text that will automatically wrap to the next line
                if it becomes too long vertically. It will also have a maximum height,
                and if the content exceeds that height, a scrollbar will appear.
            </CreatedDiv>
        </DivContainer>
    );
};

export default MeatballDiv;