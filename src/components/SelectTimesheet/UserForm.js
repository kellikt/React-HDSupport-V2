import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Button from '../Button';
import { FormEl, Title } from './UserFormComponents';
import { Inputs } from '../Admin/SchedMgmt/ClockMetrics/MetricsFormComponents';
import { ReactComponent as Graphic } from '../../images/Admin/Sched/Sheetadmin.svg';
import Background from '../Background';

class UserForm extends Component {
    state = {
        selectedUser: '',
        year: '',
        payPeriod: '',
        periods: [],
        years: [],
        searched: false,
        existingPayPeriods: [],
    };

    populatePayPeriods = event => {
        const value = event.target.value;
        const name = event.target.name;

        if (event.target.value !== "None") {
            this.setState({
                [name]: value,
                searched: false,
                periods: this.state.existingPayPeriods.filter((year) => year.year === value)[0].pay_periods
            });
        } else {
            this.setState({
                [name]: value,
                searched: false,
                periods: []
            });
        }


    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            searched: false,
        });
    };

    async componentDidMount() {
        try {
            const request = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-session-variables.php`);
            const payPeriods = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-pay-periods.php`);
            const data = await Promise.all([request, payPeriods]);
            
            const years = data[1].data.map((year) => {
                return year.year;
            })
            
            this.setState({
                selectedUser: data[0].data.username,
                existingPayPeriods: data[1].data,
                years: years,
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { selectedUser, year, payPeriod, periods, years } = this.state;

        return (
            <React.Fragment>
                <FormEl>
                    <Graphic />
                    <Title>
                        <h2>View Printable Timesheet</h2>
                        <p>Display a timesheet for: </p>
                    </Title>
                    <UserInputs>
                         <div>
                            <label htmlFor="year">Year</label>
                            <select name="year" id="year" onChange={this.populatePayPeriods} value={year}>
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
                        {year !== '' && year !=="None"
                            ? <div>
                                <label htmlFor="payperiod">Pay Period</label>
                                <select name="payPeriod" id="payperiod" onChange={this.handleChange} value={payPeriod}>
                                    <option value="None">Select Pay Period</option>
                                    {periods.map((period, index) => {
                                        return (
                                            <option value={period.value} key={index}>
                                                {period.string}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            : ''
                        }

                    </UserInputs>
                    { payPeriod !== '' && year !== '' ? 
                    <a
                    href={`${
                        process.env.REACT_APP_DB_SERVER
                    }/show-timesheet.php?payPeriod=${payPeriod}&username=${selectedUser}&year=${year}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <Button color="green">Show Timesheet</Button>
                    </a> 
                    : <a
                        href={`${
                            process.env.REACT_APP_DB_SERVER
                        }/index.php/timesheet`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button color="green">Show Timesheet</Button>
                    </a>

                    }
                </FormEl>
                <Background color="green" yOffset={90} />
            </React.Fragment>
        );
    }
}

export const UserInputs = styled(Inputs)`
    > div {
        &:first-of-type {
            margin-left: 0;
            width: 33%;
        }

        &:nth-of-type(2) {
            width: 66%;
        }
    }
`

export default UserForm;
