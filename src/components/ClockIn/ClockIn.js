import React, { Component } from 'react';
import styled from 'styled-components';

import ClockCard from './ClockCard';
import { LayoutContext } from '../../LayoutContext';

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
                <ClockCard />
            </Container>
        );
    }
}

ClockIn.contextType = LayoutContext;

export default ClockIn;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
`;
