import React, { Component } from 'react';
import axios from 'axios';

import Exceptions from './Exceptions';
import Button from '../../../Button';
import { FormEl, Title } from './AdminFormComponents';
import { Inputs } from '../ClockMetrics/MetricsFormComponents';
import { ReactComponent as Graphic } from '../../../../images/Admin/Sched/Sheetadmin.svg';
import { periods } from '../../payPeriods.json';

class AdminForm extends Component {
    state = {
        selectedUser: '',
        year: '',
        payPeriod: '',
        helpdesk: [],
        lab: [],
        third_shift: [],
        searched: false,
    };

    createYears = () => {
        let currentYear = new Date().getFullYear();
        const years = [];

        while (currentYear >= 2005) {
            years.push(currentYear);
            currentYear--;
        }

        return years;
    };

    handleSubmit = event => {
        event.preventDefault();
        const { selectedUser, year, payPeriod } = this.state;
        alert(`${selectedUser} + ${year} + ${payPeriod}`);
    };

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
            const helpdesk = axios.get('/get-list-students.php?role=helpdesk');
            const lab = axios.get('/get-list-students.php?role=lab');
            const third_shift = axios.get('/get-list-students.php?role=third_shift');

            const data = await Promise.all([helpdesk, lab, third_shift]);

            this.setState({
                helpdesk: data[0].data,
                lab: data[1].data,
                third_shift: data[2].data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { helpdesk, lab, third_shift, selectedUser, year, payPeriod } = this.state;
        const years = this.createYears();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Graphic />
                    <Title>
                        <h2>View Printable Timesheet</h2>
                        <p>Display a timesheet for:</p>
                    </Title>
                    <Inputs>
                        <div>
                            <label htmlFor="user">Student</label>
                            <select
                                name="selectedUser"
                                id="user"
                                onChange={this.handleChange}
                                value={selectedUser}
                            >
                                <option value="None">Select a Student</option>
                                <optgroup label="Help Desk">
                                    {helpdesk.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                                <optgroup label="Lab Monitors">
                                    {lab.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                                <optgroup label="Third Shift">
                                    {third_shift.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
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
                            <label htmlFor="payperiod">Pay Period</label>
                            <select
                                name="payPeriod"
                                id="payperiod"
                                onChange={this.handleChange}
                                value={payPeriod}
                            >
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
                    </Inputs>
                    <Button color="green">Show Timesheet</Button>
                </FormEl>
                <Exceptions helpdesk={helpdesk} lab={lab} third_shift={third_shift} />
            </React.Fragment>
        );
    }
}

export default AdminForm;
