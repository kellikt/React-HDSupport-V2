import React, { Component } from 'react';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, Inputs } from './ViewLeaveComponents';
import Button from '../../../Button';
import { createYears } from '../../utils';
import ViewLeaveTable from './ViewLeaveTable';

class ViewLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: new Date(),
            year: '',
            date: [new Date(), new Date()],
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
        const { period, year, submitted, date } = this.state;

        const years = createYears();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>View Your Leave Requests</h2>
                        <p>View your leave requests for the specified period.</p>
                    </Title>
                    <Inputs>
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
                    </Inputs>
                    <Button color="blue">Display Requests</Button>
                </FormEl>
                <PoseGroup>
                    {submitted && <ViewLeaveTable key="table" date={date} />}
                </PoseGroup>
            </React.Fragment>
        );
    }
}

export default ViewLeaveForm;
