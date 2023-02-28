import React, { Component } from 'react';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, Inputs } from '../ViewLeave/ViewLeaveComponents';
import { createYears } from '../../utils';

import Button from '../../../Button';
import AdminViewLeaveTable from './AdminViewLeaveTable';

import { ReactComponent as Manage } from '../../../../images/Admin/Leave/ManageLeave.svg';

class AdminViewLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: new Date(),
            year: '',
            date: [new Date(), new Date()],
            shift: '',
            submitted: false,
        };
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            submitted: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { period, year } = this.state;
        let beginDateString;
        let endDateString;
        if (period == "1") {
            beginDateString = `${year}-01-01`;
            endDateString = `${year}-06-30`;
        } else if (period == "2") {
            beginDateString = `${year}-07-01`;
            endDateString = `${year}-12-31`;
        }

        this.setState({ 
            date: [beginDateString, endDateString],
            submitted: true,
        });
    };

    render() {
        const { period, year, submitted, shift, date } = this.state;

        const years = createYears();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <AdminTitle>
                        <h2>View Leave Requests</h2>
                        <p>View a list of leave requests for the specified period.</p>
                    </AdminTitle>
                    <ManageLeave />
                    <AdminInputs>
                        <div>
                            <label htmlFor="period">Leave Period</label>
                            <select name="period" id="period" onChange={this.handleChange} value={period}>
                                <option value="None">Select Leave Period</option>
                                <option value="1">
                                    January - June
                                </option>
                                <option value="2">
                                    July - December
                                </option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="year">Year</label>
                            <select name="year" id="year" onChange={this.handleChange} value={year}>
                                <option value="None">Select Year</option>
                                {years.map(year => {
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="shift">Shift</label>
                            <select name="shift" id="shift" onChange={this.handleChange} value={shift}>
                                <option value="None">Select Shift</option>
                                <option value="1">1st Shift</option>
                                <option value="2">2nd Shift</option>
                                <option value="3">3rd Shift</option>
                            </select>
                        </div>
                    </AdminInputs>
                    <Button color="light-blue">Display Requests</Button>
                </FormEl>
                <PoseGroup>
                    {submitted && <AdminViewLeaveTable key="table" date={date} shift={shift} />}
                </PoseGroup>
            </React.Fragment>
        );
    }
}

export default AdminViewLeaveForm;

const AdminTitle = styled(Title)`
    h2 {
        color: var(--light-blue);
    }
`;

const AdminInputs = styled(Inputs)`
    >div {
        &:first-of-type {
            grid-column: 1/3;
        }
        &:nth-of-type(2) {
            grid-column: 3;
        }
        &:nth-of-type(3) {
            grid-column: 4;
        }
    }
`;

const ManageLeave = styled(Manage)`
    position: absolute;
    left: 480px;
    width: 250px;
`;
