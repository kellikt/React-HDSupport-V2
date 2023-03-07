import React, { Component } from 'react';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';
import axios from 'axios';

import { FormEl, Title, Inputs } from '../ViewLeave/ViewLeaveComponents';

import Button from '../../../Button';
import AdminViewLeaveTable from './AdminViewLeaveTable';

import { ReactComponent as Manage } from '../../../../images/Admin/Leave/ManageLeave.svg';

import { LayoutContext } from '../../../../LayoutContext';

class AdminViewLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: new Date(),
            year: '',
            date: [new Date(), new Date()],
            shift: '',
            submitted: false,
            results: [],
        };
    }

    createYears() {
        let currentYear = new Date().getFullYear();
        const years = [];

        while (currentYear >= 2023) {
            years.push(currentYear);
            currentYear--;
        }

        return years;
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            submitted: false,
        });

        let year;
        if (name === "year") {
            year = value;
        } else {
            year = this.state.year;
        }

        let period;
        if (name === "period") {
            period = value;
        } else {
            period = this.state.period;
        }

        if (parseInt(period) === 1) {
            const beginDateString = `${year}-01-01`;
            const endDateString = `${year}-06-30`;
            this.setState({ 
                date: [beginDateString, endDateString],
                submitted: false,
            });
        } else if (parseInt(period) === 2) {
            const beginDateString = `${year}-07-01`;
            const endDateString = `${year}-12-31`;
            this.setState({ 
                date: [beginDateString, endDateString],
                submitted: false,
            });
        }

    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ 
            submitted: true,
        });
        this.getTableData();
    };

    getTableData = async() => {
        const { date, shift } = this.state;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: '',
                shift: shift,
                beginDate: date[0],
                endDate: date[1],
            });
            const data = request.data;
            const usernames = [...new Set(data.map(item => item.username))];
            let res = [];

            usernames.forEach(function(user) {
                res.push(data.filter(item => item.username === user));
            });

            if (!(data === 0)) {
                this.setState({
                    results: res,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { period, year, submitted, shift, date, results } = this.state;

        const years = this.createYears();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <AdminTitle>
                        <h2>View Leave Requests</h2>
                        <p>View a list of leave requests for the specified period.</p>
                    </AdminTitle>
                    <ManageDiv>
                        <ManageLeave />
                    </ManageDiv>
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
                    {submitted && <AdminViewLeaveTable key="table" date={date} shift={shift} results={results} getTableData={this.getTableData} />}
                </PoseGroup>
            </React.Fragment>
        );
    }
}

AdminViewLeaveForm.contextType = LayoutContext;

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
            @media (max-width: 900px) {
                grid-column: 1/5;
            }
        }
        &:nth-of-type(2) {
            grid-column: 3;
            @media (max-width: 900px) {
                grid-column: 1/5;
            }
        }
        &:nth-of-type(3) {
            grid-column: 4;
            @media (max-width: 900px) {
                grid-column: 1/5;
            }
        }
    }
`;

const ManageDiv = styled.div`
    position: relative;

    @media (max-width: 800px) {
        display: none;
    }
`;

const ManageLeave = styled(Manage)`
    position: absolute;
    left: 190px;
    top: -230px;
    width: 250px;

    @media (max-width: 1000px) {
        left: 100px;
    }
`;
