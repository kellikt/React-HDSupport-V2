import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Week from './Week';
import WeekTotal from './WeekTotal';

class Timesheet extends Component {
    state = {
        week: 0,
    };

    changeWeek = index => {
        this.setState({
            week: index,
        });
    };

    render() {
        const buttons = [...Array(3).keys()];
        const { week } = this.state;
        const { weeks, totals } = this.props;

        return (
            <Container>
                <Selectors>
                    {buttons.map(index => {
                        if (week === index)
                            return (
                                <button key={index} className="active" onClick={() => this.changeWeek(index)}>
                                    Week {index + 1}
                                </button>
                            );
                        else
                            return (
                                <button key={index} onClick={() => this.changeWeek(index)}>
                                    Week {index + 1}
                                </button>
                            );
                    })}
                </Selectors>
                <WeekContainer>
                    <PoseGroup>
                        {week === 0 ? (
                            <Week key="weekOne" weekData={weeks[0]} />
                        ) : week === 1 ? (
                            <Week key="weekTwo" weekData={weeks[1]} />
                        ) : (
                            <Week key="weekThree" weekData={weeks[2]} />
                        )}
                    </PoseGroup>
                    <WeekTotal
                        regular={totals[0]}
                        night={totals[1]}
                        overtime={totals[2]}
                        nightOvertime={totals[3]}
                    />
                </WeekContainer>
            </Container>
        );
    }
}

Timesheet.propTypes = {
    weeks: PropTypes.array.isRequired,
    totals: PropTypes.array.isRequired,
};

export default Timesheet;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Selectors = styled.div`
    button {
        padding: 15px 30px;
        margin: 0 30px;
        background: #fff;
        border-radius: 4px;
        outline: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        font-weight: 600;
        font-size: 16px;
        user-select: none;
        color: #32325d80;
        transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
        height: 52px;

        &:hover {
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    .active {
        color: var(--black);
        border-bottom: 5px solid var(--blue);
    }
`;

const WeekContainer = styled.div``;
