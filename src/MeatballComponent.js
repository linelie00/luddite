// MeatballComponent.js

import React, { useState } from 'react';
import MeatballButton from './MeatballButton';
import MeatballDiv from './MeatballDiv';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
`;

const MeatballComponent = () => {
    const [divVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!divVisible);
    };

    return (
        <Container>
            <MeatballButton onClick={toggleDiv} isRotated={divVisible} />
            <MeatballDiv isVisible={divVisible} />
        </Container>
    );
};

export default MeatballComponent;
