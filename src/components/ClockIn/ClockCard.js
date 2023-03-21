import React from 'react';
import styled from '@emotion/styled';

import Form from './Form';
import Timestamp from './Timestamp';

const ClockCard = () => {
    return (
        <Container>
            <Form />
            <Timestamp />
        </Container>
    );
};

export default ClockCard;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.35fr;
    background: var(--white);
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    width: 60vw;
    border-radius: 8px;
    margin-left: 100px;

    @media (max-width: 1650px) {
        width: auto;
        margin: 0 30px;
    }

    @media(max-width: 1050px) {
        grid-template-columns: 1fr;
    }
`;
