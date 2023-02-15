import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import PropTypes from 'prop-types';
import { LayoutContext } from '../../../../LayoutContext';
import { Table, TableLabel, TableHeading, TableRow } from '../ClockMetrics/MetricsTableComponents';
import ExpandedRow from './ExpandedRow';

class ViewLeaveTable extends Component {
    state = {
        results: [],
        focused: -1,
    }

    getTableData = async() => {
        const { date } = this.props;
        const { username } = this.context;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: username,
                beginDate: date[0],
                endDate: date[1],
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
    }

    handleRowClick = index => {
        this.setState({
            focused: index,
        });
    };

    handleEdit = async (lid, beginDate, endDate, comment, status) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: status,
            });
            this.setState({
                focused: -1,
            });

            this.getTableData();
        } catch (error) {
                console.log(error);
        }  
    }

    handleDelete = async lid => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-leave-request.php`, {
                lid: lid,
            });

            this.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        await this.getTableData();
    }

    render() {
        const { results, focused } = this.state;
        const { date } = this.props;

        return (
            <Table {...this.props}>
                <Label>
                    <div>
                        <h2>Requests for: <strong>{date[0]} - {date[1]}</strong></h2>
                    </div>
                </Label>
                <Heading>
                    <span>Begin Date</span>
                    <span>End Date</span>
                    <span>Comment</span>
                    <span>Approval Status</span>
                </Heading>
                {results.map((result, index) => {
                    if (index === focused) {
                        return (
                            <ExpandedRow 
                                key={result.lid}
                                comment={result.comment}
                                beginDate={result.begin_date}
                                endDate={result.end_date}
                                status={result.status}
                                lid={result.lid}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                            />
                        );
                    } else {
                        return (
                            <Row key={result.lid} onClick={() => this.handleRowClick(index)} stagger={index}>
                                <span>{result.begin_date}</span>
                                <span>{result.end_date}</span>
                                <span>{result.comment}</span>
                                <span>{result.status}</span>
                            </Row>
                        );
                    }
                })}
            </Table>
        );
    }
}

ViewLeaveTable.contextType = LayoutContext;

ViewLeaveTable.propTypes = {
    date: PropTypes.array.isRequired,
};

export default ViewLeaveTable;

const Label = styled(TableLabel)`
    background: var(--blue-button);
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Row = styled(TableRow)`
    grid-template-columns: 1fr 1fr 1fr 1fr;
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