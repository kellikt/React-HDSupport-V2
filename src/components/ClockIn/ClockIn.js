import React, { Component } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as Laptop } from '../../images/Clock/Laptop.svg';
import ClockCard from './ClockCard';
import CommentAdvice from './CommentAdvice';
import { LayoutContext } from '../../LayoutContext';
import { ClockProvider } from './ClockContext';

class ClockIn extends Component {
    componentDidMount() {
        let value = this.context;
        const { changeSize } = value;

        changeSize();
    }

    componentWillUnmount() {
        let value = this.context;
        const { changeSize } = value;

        changeSize();
    }

    render() {
        return (
            <Container>
                <Laptop />
                <ClockProvider>
                    <ClockCard />
                </ClockProvider>
                <CommentAdvice />
            </Container>
        );
    }
}

ClockIn.contextType = LayoutContext;

export default ClockIn;

const Container = styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    overflow-x: hidden;

    > svg {
        width: 41vw;
        height: 780px;
        right: -8vw;
        top: 30px;
        position: absolute;

        @media (max-width: 1650px) {
            display: none;
            visibility: hidden;
            opacity: 0;
        }
    }
`;
