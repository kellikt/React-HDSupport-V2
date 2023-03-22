import React, { Component } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

import { FormEl, Title, Inputs } from './MetricsFormComponents';
import { ReactComponent as Graphic } from '../../../../images/Admin/Sched/Metrics.svg';
import Button from '../../../Button';
import MetricsTable from './MetricsTable';
import periods from '../../payPeriods';
import { createYears } from '../../utils';

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
            leapstart: [],
            searched: false,
        };
    }

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
        try {
            const helpdesk = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=helpdesk`);
            const lab = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=lab`);
            const third_shift = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=third_shift`);
            const leapstart = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=leapstart`);

            const data = await Promise.all([helpdesk, lab, third_shift, leapstart]);

            this.setState({
                helpdesk: data[0].data,
                lab: data[1].data,
                third_shift: data[2].data,
                leapstart: data[3].data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { selectedUser, year, payPeriod, helpdesk, lab, third_shift, leapstart, searched } = this.state;
        const years = createYears();

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
                            <select name="selectedUser" id="user" onChange={this.handleChange} value={selectedUser}>
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
                                <optgroup label="Leap Start">
                                    {leapstart.map(student => {
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
                    </Inputs>
                    <Button color="light-blue">Display Actions</Button>
                </FormEl>
                <AnimatePresence>
                    {searched && <MetricsTable key="table" student={selectedUser} year={year} payPeriod={payPeriod} />}
                </AnimatePresence>
            </React.Fragment>
        );
    }
}

export default MetricsForm;
