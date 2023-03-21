import React, { Component } from 'react';
import styled from '@emotion/styled';
import { OutageContext } from './OutageContext';

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.currDate = new Date();
        this.dates = [
            { date: this.currDate },
            { date: new Date(this.currDate.getTime() + 86400000) }, // +1 day in ms
            { date: new Date(this.currDate.getTime() + 86400000 * 2) },
        ];
    }

    render() {
        let value = this.context;
        const { focused, handleClick } = value;

        return (
            <Container>
                {this.dates.map((date, index) => {
                    if (index === focused)
                        return (
                            <Tab dark onClick={() => handleClick(index)} key={index}>
                                {`${date.date.getMonth() + 1}/${date.date.getDate()}`}
                            </Tab>
                        );
                    else
                        return (
                            <Tab onClick={() => handleClick(index)} key={index}>
                                {`${date.date.getMonth() + 1}/${date.date.getDate()}`}
                            </Tab>
                        );
                })}
            </Container>
        );
    }
}

Tabs.contextType = OutageContext;

export default Tabs;

const Container = styled.ul`
    display: flex;
    width: 100%;
    background: #ece5db;
    border-radius: 8px 8px 0 0;
`;

const Tab = styled.li`
    color: var(--black);
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 12px;
    width: calc(100% / 3);
    cursor: pointer;
    transition: all 0.1s ease;
    background: ${props => (props.dark ? 'var(--brown)' : null)};
    box-shadow: ${props => (props.dark ? 'inset 0 5px 0 #696969' : null)};

    &:first-of-type {
        border-top-left-radius: 8px;
    }

    &:last-of-type {
        border-top-right-radius: 8px;
    }

    &:hover {
        background: var(--brown);
    }

    @media (max-width: 500px) {
        font-size: 16px;
    }
`;
