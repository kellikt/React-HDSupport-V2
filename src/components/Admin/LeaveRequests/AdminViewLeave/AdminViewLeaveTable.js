import React, { Component } from 'react';
import styled from '@emotion/styled';

import PropTypes from 'prop-types';
import { Table, TableLabel, TableHeading, TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';

class AdminViewLeaveTable extends Component {

    getConflict = (beginDate, endDate) => {
        const { results } = this.props;

        const merged = results.flat(1);

        const checkConflicts = merged.filter((result) => {
            if ((beginDate >= result.begin_date && beginDate <= result.end_date) || (endDate >= result.begin_date && endDate <= result.end_date) || (beginDate <= result.begin_date && endDate >= result.endDate)) {
                return true;
            } else {
                return false;
            }
        });

        if (checkConflicts.length > 1) {
            return "no";
        } else {
            return "yes";
        }
    }

    render() {
        const { date, shift, results } = this.props;

        return (
            <Table {...this.props}  
            initial={{
                y: 50,
                opacity: 0,
            }} 
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    when: 'beforeChildren',
                    ease: 'circOut',
                    duration: 0.2,
                },
            }}
            exit={{
                y: 50,
                opacity: 0,
                transition: { ease: 'circOut', duration: 0.2 },
            }}>
                <Label>
                    <div>
                        <h2>Requests for: <strong>{date[0]} to {date[1]}</strong></h2>
                    </div>
                </Label>
                <Heading>
                    <span>Priority</span>
                    <span>Username</span>
                    <span>Requested Dates</span>
                    <span>No Conflicts?</span>
                    <span>Approval Status</span>
                </Heading>
                {results.map((result, index) => {
                    return (
                        <a
                        href={`${process.env.PUBLIC_URL}/leave-request/admin-leave/${result[0].username}/${date[0]}/${date[1]}/${shift}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <Row key={result[0].username} stagger={index}>
                                {result.map((res, index) => {
                                    return (
                                        <div>
                                            <span>{index === 0  ? <p>{res.priority}</p> : ''}</span>
                                            <span>{index === 0  ? <p>{res.username}</p> : ''}</span>
                                            <span>{res.begin_date} - {res.end_date}</span>
                                            <span>{this.getConflict(res.begin_date, res.end_date) === 'yes' ? 
                                                <Check />
                                            : <Cross />}</span>
                                            <span>{function() {
                                                switch(res.status) {
                                                    case 0:
                                                        return <p>?</p>;
                                                    case 1:
                                                        return <Cross />;
                                                    case 2:
                                                        return <Check />;
                                                    default:
                                                        return <p>?</p>;
                                                }
                                            }()}</span>
                                        </div>
                                    );
                                })}
                            </Row>
                        </a>
                    );
                })}
            </Table>
        );
    }
}

AdminViewLeaveTable.propTypes = {
    date: PropTypes.array.isRequired,
    results: PropTypes.array,
    getTableData: PropTypes.func,
    shift: PropTypes.number,
}

export default AdminViewLeaveTable;

const Label = styled(TableLabel)`
    background: var(--light-blue-button);
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
    > span {
        &:nth-of-type(4) {
            display: block;
            margin: 0 auto;
        }
    }
`;

const Row = styled(TableRow)`
    grid-template-columns: 1fr;
    transition: transform 0.25s ease-out, box-shadow 0.1s ease-out;
    padding: 24px 18px;
    &:hover {
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        transform: scale(1.03);
        cursor: pointer;
    }

    &:active {
        transform: scale(1);
    }


    >div {
        display: grid;
        grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
        grid-column-gap: 12px;
        >span {
            >svg {
                width: 25px;
                display: block;
                margin: 0 auto;
            }
        }
    }
`;