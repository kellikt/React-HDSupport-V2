import React, { Component } from 'react';
import styled from 'styled-components';

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

    > svg {
        width: 41vw;
        height: 41vw;
        right: -6vw;
        top: 0;
        position: absolute;
    }
`;
