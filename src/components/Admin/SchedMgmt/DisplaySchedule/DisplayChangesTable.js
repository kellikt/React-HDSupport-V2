import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';

import { Table, TableLabel, TableHeading, TableRow, Location } from '../ClockMetrics/MetricsTableComponents';
import { ReactComponent as TableLogo } from '../../../../images/Admin/Sched/Table.svg';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';
import { ReactComponent as X } from '../../../../images/icons/RedCross.svg';
import ExpandedRow from './ExpandedRow';

class DisplayChangesTable extends Component {
    state = {
        results: [],
        focused: -1,
    };

    getTableData = async () => {
        const { username, date, option } = this.props;
        const startDateString = `${date[0].getFullYear()}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
        const endDateString = `${date[1].getFullYear()}-${date[1].getMonth() + 1}-${date[1].getDate()}`;

        try {
            const request = await axios.post('/get-schedule-changes.php', {
                username: username,
                beginDate: startDateString,
                endDate: endDateString,
                option: option,
            });
            const data = request.data;
            if (!(data === 0)) {
                this.setState({
                    results: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleRowClick = index => {
        this.setState({
            focused: index,
        });
    };

    handleEdit = async (sid, notes, beginDate, endDate) => {
        try {
            await axios.post('/edit-schedule-change.php', {
                sid: sid,
                notes: notes,
                beginDate: beginDate,
                endDate: endDate,
            });

            this.setState({
                focused: -1,
            });

            this.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async sid => {
        try {
            await axios.post('/delete-schedule-change.php', {
                sid: sid,
            });

            this.setState(state => {
                return { ...state, results: state.results.filter(result => result.sid !== sid), focused: -1 };
            });
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        await this.getTableData();
    }

    render() {
        const { results, focused } = this.state;
        const { username, date, option } = this.props;
        const startDateString = `${date[0].getMonth() + 1}/${date[0].getDate()}/${date[0].getFullYear()}`;
        const endDateString = `${date[1].getMonth() + 1}/${date[1].getDate()}/${date[1].getFullYear()}`;

        return (
            <Table {...this.props}>
                <Label>
                    <TableLogo />
                    <div>
                        <h2>
                            Results for: <strong>{username === '' ? `All ${option}` : username}</strong>
                        </h2>
                        <span>
                            {startDateString} - {endDateString}
                        </span>
                    </div>
                </Label>
                <Heading>
                    <span>Username</span>
                    <span>Notes</span>
                    <span>Begin Date</span>
                    <span>End Date</span>
                    <span>{focused >= 0 ? 'Action' : 'Multi-Day?'}</span>
                </Heading>
                <PoseGroup>
                    {results.map((result, index) => {
                        if (index === focused) {
                            return (
                                <ExpandedRow
                                    key={result.sid}
                                    username={result.username}
                                    notes={result.notes}
                                    beginDate={result.begin_date}
                                    endDate={result.end_date}
                                    sid={result.sid}
                                    handleDelete={this.handleDelete}
                                    handleEdit={this.handleEdit}
                                />
                            );
                        } else {
                            return (
                                <Row
                                    key={result.sid}
                                    onClick={() => this.handleRowClick(index)}
                                    stagger={index}
                                >
                                    <Username>{result.username}</Username>
                                    <Notes>{result.notes}</Notes>
                                    <span>{result.begin_date}</span>
                                    <span>{result.end_date}</span>
                                    <Location>
                                        {result.begin_date === result.end_date ? <X /> : <Check />}
                                    </Location>
                                </Row>
                            );
                        }
                    })}
                </PoseGroup>
            </Table>
        );
    }
}

DisplayChangesTable.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
    option: PropTypes.string,
};

export default DisplayChangesTable;

const Label = styled(TableLabel)`
    background: var(--gold-button);
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 0.7fr 1fr 0.7fr 0.7fr 0.3fr;

    span {
        &:nth-of-type(4) {
            margin-right: 24px;
        }
    }
`;

const Row = styled(TableRow)`
    grid-template-columns: 0.7fr 1fr 0.7fr 0.7fr 0.3fr;
    font-weight: 500;
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

    span {
        &:nth-of-type(3) {
            color: var(--green);
        }

        &:last-of-type {
            justify-self: stretch;
            color: var(--red);
            margin-right: 24px;
        }
    }
`;

const Notes = styled.span`
    font-weight: 400;
`;

const Username = styled.span`
    font-weight: 700;
`;
