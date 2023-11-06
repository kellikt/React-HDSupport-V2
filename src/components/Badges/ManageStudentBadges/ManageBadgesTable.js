import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Table, TableLabel, TableHeading, TableRow } from '../../Admin/SchedMgmt/ClockMetrics/MetricsTableComponents';
import { ReactComponent as TableLogo } from '../../../images/Admin/Badges/Table.svg';
import ExpandedRow from './ExpandedRow';

const dayjs = require('dayjs');

class ManageBadgesTable extends Component {
    state = {
        results: [],
        focused: -1,
        image: ''
    };

    getTableData = async () => {
        const { user, badge } = this.props;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-student-badges.php`, {
                badge: badge,
                user: user
            });
            const data = request.data;
            if (!(data === 0 || data === '')) {
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

    handleEdit = async (username, bid, tstamp, notes, fav) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-student-badge.php`, {
                username: username,
                bid: bid,
                tstamp: dayjs(dayjs(tstamp, "MM-DD-YYYY")).unix(),
                notes: notes,
                fav: fav
            });

            this.getTableData();

            this.setState({
                focused: -1,
            });

            this.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async (bid, uid) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-student-badge.php`, {
                bid: bid,
                uid: uid
            });

            this.setState(state => {
                return { ...state, results: state.results.filter(result => result.bid !== bid), focused: -1 };
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
        const { user, badge } = this.props;

        return (
            <Table {...this.props}>
                <Label>
                    <TableLogo />
                    <div>
                        <h2>
                            Results for: <strong>{badge === '' ? `All Badges for ${user}` : badge}</strong>
                        </h2>
                    </div>
                </Label>
                <Heading>
                    <span>Username</span>
                    <span>Badge</span>
                    <span>Date Received</span>
                    <span>Comments</span>
                    <span>{focused >= 0 ? 'Action' : ''}</span>
                </Heading>
                {results.map((result, index) => {
                    if (index === focused) {
                        return (
                            <ExpandedRow
                                key={result.bid}
                                username={result.username}
                                title={result.title}
                                comments={result.notes}
                                timestamp={result.tstamp}
                                bid={result.bid}
                                uid={result.uid}
                                fav={result.fav}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                            />
                        );
                    } else {
                        return (
                            <Row key={result.bid} onClick={() => this.handleRowClick(index)} stagger={index}>
                                <Username>{result.username}</Username>
                                <Username>{result.title}</Username>
                                <span>{dayjs.unix(result.tstamp).format('MM-DD-YYYY')}</span>
                                <Notes>{result.notes}</Notes>
                            </Row>
                        );
                    }
                })}
            </Table>
        );
    }
}

ManageBadgesTable.propTypes = {
    user: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
};

export default ManageBadgesTable;

const Label = styled(TableLabel)`
    background: var(--dark-blue-button);
`;

const Heading = styled(TableHeading)`
    background: linear-gradient(180deg, #4072d7, #22458b);
    color: var(--white); 
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.8fr 0.3fr;

    span {
        &:nth-of-type(4) {
            margin-right: 24px;
        }
    }
`;

const Row = styled(TableRow)`
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.8fr 0.3fr;
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

`;

const Notes = styled.span`
    font-weight: 400;
    justify-self: left !important;
`;

const Username = styled.span`
    font-weight: 700;
`;
