import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ClockContext } from './ClockContext';

class Timestamp extends Component {
    render() {
        let value = this.context;
        const { lastClock } = value;
        const { action, dayOfWeek, time, date, comments } = lastClock;

        return (
            <Container>
                <Title>Last Clock-{action}</Title>
                <Stamp>
                    <h4>Your Timestamp:</h4>
                    <span>{dayOfWeek}</span>
                    <span>{time}</span>
                    <span>{date}</span>
                </Stamp>
                <Comments>
                    <h4>Your Comments:</h4>
                    <p>{comments}</p>
                </Comments>
            </Container>
        );
    }
}

Timestamp.contextType = ClockContext;

export default Timestamp;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    color: var(--white);
    background: linear-gradient(135deg, #44609e, #3192bb);
    border-radius: 0 4px 4px 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    padding: 30px;

    h4 {
        font-weight: 600;
        font-size: 16px;
        font-style: italic;
        margin: 0 0 12px;
    }

    @media (max-width: 1050px) {
        flex-direction: row;
        align-items: center;
    }

    @media (max-width: 500px) {
        padding: 12px;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    letter-spacing: 0.065em;
    text-transform: uppercase;
    padding-bottom: 24px;
    font-weight: 600;
    border-bottom: 1px solid #d2d1d1cc;
    margin: 0;

    @media (max-width: 1050px) {
        border-right: 1px solid #d2d1d1cc;
        padding: 30px 24px 30px 0;
        border-bottom: 0;
    }

    @media (max-width: 500px) {
        padding: 12px 4px;
        font-size: 16px;
        width: 30%;
    }
`;

const Stamp = styled.div`
    span {
        font-size: 15px;
        display: block;
    }

    @media (max-width: 500px) {
        font-size: 15px;
        width: 40%;

        span {
            font-size: 14px;
        }
    }
`;

const Comments = styled.div`
    padding-top: 24px;
    border-top: 1px solid #d2d1d1cc;

    p {
        margin: 12px 0 0 0;
    }

    h4 {
        margin: 0;
    }

    @media (max-width: 1050px) {
        border-left: 1px solid #d2d1d1cc;
        padding: 30px 0 30px 24px;
        border-top: 0;
    }

    @media (max-width: 500px) {
        padding: 12px 4px;
        font-size: 15px;
        width: 30%;
    }
`;
