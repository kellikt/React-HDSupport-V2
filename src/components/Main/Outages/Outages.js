import React, { Component } from 'react';
import styled from 'styled-components';

import OutageContent from './OutageContent';
import Tabs from './Tabs';

class Outages extends Component {
    render() {
        return (
            <Container>
                <Tabs />
                <OutageContent />
            </Container>
        );
    }
}

export default Outages;

const Container = styled.div`
    background: var(--brown);
    border-radius: 8px;
    width: 566px;
    min-height: 375px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
        0 5px 15px rgba(0, 0, 0, 0.07);
    transform-origin: top center;

    @media (min-width: 880px) {
        box-shadow: 1px 1px 5px 0 rgba(26, 26, 67, 0.05),
            39px 62.5px 125px -25px rgba(50, 50, 93, 0.5),
            23.4px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
        transform: scale(1) translateX(50px) translateY(0) perspective(3190px)
            rotateY(-29deg) rotateX(4deg) rotate(1deg);
    }
`;
