import React, { Component } from 'react';
import axios from 'axios';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, Inputs } from './MetricsFormComponents';
import { ReactComponent as Graphic } from '../../../images/Admin/Sched/Metrics.svg';
import Button from '../../Button';
import MetricsTable from './MetricsTable';

class MetricsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: '',
            year: '',
            payPeriod: '',
            helpdesk: [],
            lab: [],
            third_shift: [],
            searched: false,
        };
    }

    createYears = () => {
        let currentYear = new Date().getFullYear();
        const years = [];

        while (currentYear >= 2005) {
            years.push(currentYear);
            currentYear--;
        }

        return years;
    };

    createPayPeriods = () => {
        const payPeriods = [];
        payPeriods.push({ string: 'January 1 - January 15', value: [1, 1, 15] });
        payPeriods.push({ string: 'January 16 - January 31', value: [1, 16, 31] });
        payPeriods.push({ string: 'Febuary 1 - Febuary 15', value: [2, 1, 15] });
        payPeriods.push({ string: 'Febuary 16 - End of Feb', value: [2, 16, 29] });
        payPeriods.push({ string: 'March 1 - March 15', value: [3, 1, 15] });
        payPeriods.push({ string: 'March 16 - March 31', value: [3, 16, 31] });
        payPeriods.push({ string: 'April 1 - April 15', value: [4, 1, 15] });
        payPeriods.push({ string: 'April 16 - April 30', value: [4, 16, 30] });
        payPeriods.push({ string: 'May 1 - May 15', value: [5, 1, 15] });
        payPeriods.push({ string: 'May 16 - May 31', value: [5, 16, 15] });
        payPeriods.push({ string: 'June 1 - June 15', value: [6, 1, 15] });
        payPeriods.push({ string: 'June 16 - June 30', value: [6, 16, 30] });
        payPeriods.push({ string: 'July 1 - July 15', value: [7, 1, 15] });
        payPeriods.push({ string: 'July 16 - July 31', value: [7, 16, 31] });
        payPeriods.push({ string: 'August 1 - August 15', value: [8, 1, 15] });
        payPeriods.push({ string: 'August 16 - August 31', value: [8, 16, 31] });
        payPeriods.push({ string: 'September 1 - September 15', value: [9, 1, 15] });
        payPeriods.push({ string: 'September 16 - September 30', value: [9, 16, 30] });
        payPeriods.push({ string: 'October 1 - October 15', value: [10, 1, 15] });
        payPeriods.push({ string: 'October 16 - October 31', value: [10, 16, 31] });
        payPeriods.push({ string: 'November 1 - November 15', value: [11, 1, 15] });
        payPeriods.push({ string: 'November 16 - November 30', value: [11, 16, 30] });
        payPeriods.push({ string: 'December 1 - December 15', value: [12, 1, 15] });
        payPeriods.push({ string: 'December 16 - December 31', value: [12, 16, 31] });

        return payPeriods;
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            searched: true,
        });
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
        const helpdesk = axios.get('/get-list-students.php?role=helpdesk');
        const lab = axios.get('/get-list-students.php?role=lab');
        const third_shift = axios.get('/get-list-students.php?role=third_shift');

        const data = await Promise.all([helpdesk, lab, third_shift]);

        this.setState({
            helpdesk: data[0].data,
            lab: data[1].data,
            third_shift: data[2].data,
        });
    }

    render() {
        const { selectedUser, year, payPeriod, helpdesk, lab, third_shift, searched } = this.state;
        const years = this.createYears();
        const payPeriods = this.createPayPeriods();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Graphic />
                    <Title>
                        <h2>Look Up User</h2>
                        <p>Search clock-in/out actions for:</p>
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
                                {payPeriods.map((period, index) => {
                                    return (
                                        <option value={period.value} key={index}>
                                            {period.string}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </Inputs>
                    <Button color="lightblue">Display Actions</Button>
                </FormEl>
                <PoseGroup>
                    {searched && (
                        <MetricsTable key="table" student={selectedUser} year={year} payPeriod={payPeriod} />
                    )}
                </PoseGroup>
            </React.Fragment>
        );
    }
}

export default MetricsForm;
