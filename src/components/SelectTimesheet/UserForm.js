import { Component } from 'react';
import axios from 'axios';

import Button from '../Button';
import { FormEl, Title } from './UserFormComponents';
import { Inputs } from '../Admin/SchedMgmt/ClockMetrics/MetricsFormComponents';
import { ReactComponent as Graphic } from '../../images/Admin/Sched/Sheetadmin.svg';
import { createYears } from '../Admin/utils';
import periods from '../Admin/payPeriods';
import Background from '../Background';

class UserForm extends Component {
    state = {
        selectedUser: '',
        year: '',
        payPeriod: '',
        searched: false,
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
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-session-variables.php`);
            const data = request.data;
            
            this.setState({
                selectedUser: data.username,
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { selectedUser, year, payPeriod } = this.state;
        const years = createYears();

        return (
            <React.Fragment>
                <FormEl>
                    <Graphic />
                    <Title>
                        <h2>View Printable Timesheet</h2>
                        <p>Display a timesheet for: </p>
                    </Title>
                    <Inputs>
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
                    </Inputs>
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

export default UserForm;
