import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import CloseButton from '../../../CloseButton';
import Button from '../../../Button';

const HolidayList = props => {
    const { holidayList, full, heading, color, week } = props;

    const handleDelete = stamp => {
        props.handleDelete(stamp);
    };

    const getHolidays = full => {
        props.getHolidays(full);
    };

    return (
        <React.Fragment>
            <List pose="enter">
                <h3>Current {heading}: </h3>
                <PoseGroup>
                    {holidayList.map((item, index) => {
                        const date = new Date(item.date * 1000),
                            locale = 'en-us',
                            month = date.toLocaleString(locale, { month: 'long' });

                        let dateString = `${month} ${date.getDate()}, ${date.getFullYear()}`;
                        if (week) {
                            const endOfWeek = new Date(item.date * 1000 + 518400 * 1000),
                                endMonth = endOfWeek.toLocaleString(locale, { month: 'long' });
                            dateString = `${dateString} — ${endMonth} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
                        }
                        return (
                            <Holiday key={item.date} stagger={index} color={color}>
                                <div>
                                    <p>{dateString}</p>
                                    <span>{item.description}</span>
                                </div>
                                <CloseButton onClick={() => handleDelete(item.date)} />
                            </Holiday>
                        );
                    })}
                </PoseGroup>
            </List>

            {full ? (
                <Button color="secondary" type="button" onClick={() => getHolidays('no')}>
                    Show Short List
                </Button>
            ) : (
                <Button color="secondary" type="button" onClick={() => getHolidays('yes')}>
                    Show Full List
                </Button>
            )}
        </React.Fragment>
    );
};

HolidayList.propTypes = {
    holidayList: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    full: PropTypes.bool.isRequired,
    getHolidays: PropTypes.func.isRequired,
    heading: PropTypes.string,
    color: PropTypes.string,
    week: PropTypes.bool,
};

export default HolidayList;

const List = styled.ul`
    margin: 42px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
    border-radius: 8px;

    h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
        padding: 12px;
        background: #f6f9fc;
        border-bottom: 3px solid #e4ebf4;
        border-top: 3px solid #e4ebf4;
        border-radius: 8px 8px 0 0;
    }
`;

const AnimatedHoliday = posed.li({
    enter: { opacity: 1, delay: ({ stagger }) => stagger * 100 },
    exit: { opacity: 0 },
});

export const Holiday = styled(AnimatedHoliday)`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    grid-column-gap: 12px;
    padding: 8px 12px;
    border-bottom: 3px solid #e4ebf4;

    &:last-of-type {
        border: 0;
    }

    div {
        color: ${({ color }) => `var(--${color})`};
        font-weight: 600;
        font-size: 17px;

        p {
            margin: 0;
        }

        span {
            color: var(--dark-grey);
            padding: 0;
            font-weight: 400;
            font-size: 15px;
        }
    }

    span {
        position: static;
        width: 22px;
        height: 22px;
        padding: 6px;
    }
`;
