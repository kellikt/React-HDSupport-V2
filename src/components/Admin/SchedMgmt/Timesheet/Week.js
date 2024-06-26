import { Component } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import WeekTotal from './WeekTotal';
import DayException from './DayException';

class Week extends Component {
    state = {
        focused: null,
    };

    resetFocus = () => {
        this.setState({
            focused: null,
        });
    };

    handleClick = index => {
        this.setState({
            focused: index,
        });
    };

    createEmptySpans = num => {
        const array = [...Array(num).keys()];
        return array;
    };

    subtractDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);

        return result;
    };

    addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);

        return result;
    };

    // creates an array that contains the dates of the trailing days of the 1st week which fall in the previous pay period.
    getExtraFirstWeekDays = dayKeys => {
        const { weekData } = this.props;
        // Setup the trailing dates to add. These elements will not be interactable.
        const array = [];
        if (!(Object.keys(weekData).length === 0 && weekData.constructor === Object)) {
            const firstDate = new Date(weekData[dayKeys[0]].date); // get the "earliest" day of the week from Sunday
            const daysToAdd = firstDate.getDay(); // num of days since the last Sunday
            for (let i = 1; i < daysToAdd + 1; i++) {
                array.unshift(this.subtractDays(firstDate, i));
            }
        }

        return array;
    };

    // creates an array that contains the dates of the leading days of the 3rd week  that fall into the next pay period.
    getExtraLastWeekDays = dayKeys => {
        const { weekData } = this.props;
        const array = [];

        if (!(Object.keys(weekData).length === 0 && weekData.constructor === Object)) {
            const lastDate = new Date(weekData[dayKeys[dayKeys.length - 1]].date); // get the "leading" day of the week
            const daysToAdd = 6 - lastDate.getDay();
            for (let i = 1; i < daysToAdd + 1; i++) {
                array.push(this.addDays(lastDate, i));
            }
        }

        return array;
    };

    render() {
        const { weekData, username, refreshData } = this.props;
        const { focused } = this.state;
        const dayKeys = Object.keys(weekData).filter(key => {
            // interactable rows
            return !key.includes('_');
        });
        const extraFirstWeekDays = this.getExtraFirstWeekDays(dayKeys);
        const extraLastWeekDays = this.getExtraLastWeekDays(dayKeys);

        return (
            <WeekContainer {...this.props}
            initial={{
                y: 50,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
                delay: 0.8,
                transition: {
                    duration: 0.8,
                    ease: 'easeIn',
                },
            }}
            exit={{
                y: 50,
                opacity: 0,
                transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                },
            }}
            >
                <Container>
                    <Heading>
                        <span>Date</span>
                        <span>Start</span>
                        <span>Stop</span>
                        <span>Start</span>
                        <span>Stop</span>
                        <span>Start</span>
                        <span>Stop</span>
                        <span>Reg</span>
                        <span>Night</span>
                        <span>OT</span>
                        <span>NT OT</span>
                    </Heading>
                    <AnimatePresence>
                        {extraFirstWeekDays.map(day => {
                            const dayOfWeek = day.toLocaleString('en-US', { weekday: 'long' });
                            return (
                                <InactiveDay key={day.getTime()}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 0.3,
                                    delay: 3,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                >
                                    <DateOfRow>
                                        <div>{`${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`}</div>
                                        <div>{dayOfWeek}</div>
                                    </DateOfRow>
                                </InactiveDay>
                            );
                        })}
                        {dayKeys.map((day, index) => {
                            const currentDayObj = weekData[day];
                            let clocksExist = false;
                            let emptySpans;
                            if (currentDayObj.hasOwnProperty('times')) {
                                clocksExist = true;
                                if (currentDayObj.times.length > 6) {
                                    // reduce times to six
                                    currentDayObj.times = currentDayObj.times.slice(0,6);
                                }
                                emptySpans = this.createEmptySpans(6 - currentDayObj.times.length); // maximum of 6 spans needed
                            } else {
                                emptySpans = this.createEmptySpans(6);
                            }

                            if (focused === index) {
                                return (
                                    <DayException
                                        key={`fullday${day}`}
                                        day={day}
                                        dayObj={currentDayObj}
                                        username={username}
                                        close={this.resetFocus}
                                        refreshData={refreshData}
                                    />
                                );
                            } else {
                                return (
                                    <Day 
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        delay: 3,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    key={day} onClick={() => this.handleClick(index)}>
                                        <DateOfRow>
                                            <div>{currentDayObj.date}</div>
                                            <div>{day}</div>
                                        </DateOfRow>
                                        {clocksExist
                                            ? currentDayObj.times.slice(0, 6).map((time, index) => {
                                                  if (index % 2 === 0)
                                                      return (
                                                          <Time key={index} green>
                                                              {time.replace(`<font color='red'>`,'').replace('</font>','')}
                                                          </Time>
                                                      );
                                                  else return <Time key={index}>{time.replace(`<font color='red'>`,'').replace('</font>','')}</Time>;
                                              })
                                            : null}
                                        {emptySpans.map(index => {
                                            return <span key={index} />;
                                        })}
                                        {currentDayObj.total_reg === '0:00' ? (
                                            <Hours>{currentDayObj.total_reg.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        ) : (
                                            <Hours active>{currentDayObj.total_reg.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        )}
                                        {currentDayObj.total_night === '0:00' ? (
                                            <Hours>{currentDayObj.total_night.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        ) : (
                                            <Hours active>{currentDayObj.total_night.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        )}
                                        {currentDayObj.totalot_reg === '0:00' ? (
                                            <Hours>{currentDayObj.totalot_reg.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        ) : (
                                            <Hours active>{currentDayObj.totalot_reg.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        )}
                                        {currentDayObj.totalot_night === '0:00' ? (
                                            <Hours>{currentDayObj.totalot_night.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        ) : (
                                            <Hours active>{currentDayObj.totalot_night.replace(`<font color='red'>`,'').replace('</font>','')}</Hours>
                                        )}
                                    </Day>
                                );
                            }
                        })}
                        {extraLastWeekDays.map(day => {
                            const dayOfWeek = day.toLocaleString('en-US', { weekday: 'long' });
                            return (
                                <InactiveDay key={day.getTime()}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 0.3,
                                    delay: 3,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                >
                                    <DateOfRow>
                                        <div>{`${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`}</div>
                                        <div>{dayOfWeek}</div>
                                    </DateOfRow>
                                </InactiveDay>
                            );
                        })}
                    </AnimatePresence>
                </Container>
                <WeekTotal
                    regular={weekData.subtotal_reg}
                    night={weekData.subtotal_night}
                    overtime={weekData.subtotalot_reg}
                    nightOvertime={weekData.subtotalot_night}
                    hoursString="Sub-total Hours"
                />
            </WeekContainer>
        );
    }
}

Week.propTypes = {
    weekData: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    refreshData: PropTypes.func,
};

export default Week;

const WeekContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    margin-top: 21px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    background: var(--white);
    width: 100%;
`;

const Heading = styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    text-transform: uppercase;
    border-radius: 4px 4px 0 0;
    border-top: 3px solid #e4ebf4;
    border-bottom: 3px solid #e4ebf4;
    background: #ebf1f8;
    font-size: 15px;
    font-weight: 500;
    text-align: center;

    > span {
        padding: 15px;

        &:first-of-type {
            text-align: left;
        }
    }
`;

const Day = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #f6fafd;
    }

    > span {
        padding: 15px;
    }
`;

const InactiveDay = styled(motion.div)`
    cursor: not-allowed;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    font-weight: 500;

    > span {
        padding: 15px;
    }
`;

export const DateOfRow = styled.span`
    border-right: 3px solid #e4ebf4;

    > div {
        &:first-of-type {
            color: var(--light-blue);
            font-size: 15px;
        }
        &:last-of-type {
            color: var(--dark-grey);
            font-weight: 400;
            font-size: 14px;
        }
    }
`;

const Time = styled.span`
    display: block;
    margin: auto;
    color: ${props => (props.green ? 'var(--green)' : 'var(--red)')};
`;

const Hours = styled(Time)`
    color: ${props => (props.active ? 'var(--blue)' : 'var(--dark-grey)')};
`;
