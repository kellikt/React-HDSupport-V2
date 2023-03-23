import React, { Component } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import axios from 'axios';

import { FormEl, Title, Inputs } from './ViewLeaveComponents';
import Button from '../../../Button';
import ViewLeaveTable from './ViewLeaveTable';
import { ReactComponent as View } from '../../../../images/Admin/Leave/ViewLeave.svg';
import { LayoutContext } from '../../../../LayoutContext';

class ViewLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: "0",
            year: '',
            date: [new Date(), new Date()],
            submitted: false,
            results: [],
        };
    }

    createYears() {
        let currentYear = new Date().getFullYear() + 1;
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
        })
        this.getTableData();
    };

    getTableData = async() => {
        const { date } = this.state;
        const { username } = this.context;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: username,
                shift: '',
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

    render() {
        const { period, year, submitted, date, results } = this.state;

        const years = this.createYears();

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>View Your Leave Requests</h2>
                        <p>View your leave requests for the specified period.</p>
                    </Title>
                    <ViewDiv>
                        <ViewGraphic />
                    </ViewDiv>
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
                <AnimatePresence>
                    {submitted && <ViewLeaveTable key="table" results={results} date={date} getTableData={this.getTableData} />}
                </AnimatePresence>
            </React.Fragment>
        );
    }
}

ViewLeaveForm.contextType = LayoutContext;

export default ViewLeaveForm;

const ViewGraphic = styled(View)`
    position: absolute;
    left: 145px;
    top: -120px;

    @media (max-width: 800px) {
        display: none;
    }
    @media (max-width: 1100px) {
        left: 50px;
    }
`;

const ViewDiv = styled.div`
    position: relative
`;
