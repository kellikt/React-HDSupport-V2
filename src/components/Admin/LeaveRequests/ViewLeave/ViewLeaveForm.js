import React, { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import axios from 'axios';

import { FormEl, Title, Inputs } from './ViewLeaveComponents';
import Button from '../../../Button';
import ViewLeaveTable from './ViewLeaveTable';
import { ReactComponent as View } from '../../../../images/Admin/Leave/ViewLeave.svg';
import { LayoutContext } from '../../../../LayoutContext';

function ViewLeaveForm() {
    const { username } = useContext(LayoutContext);
    const [state, setState] = useState({
        period: "0",
        year: '',
        date: [new Date(), new Date()],
        submitted: false,
        results: [],
    });

    const createYears = () => {
        let currentYear = new Date().getFullYear() + 1;
        const years = [];

        while (currentYear >= 2023) {
            years.push(currentYear);
            currentYear--;
        }

        return years;
    }

    const years = createYears();

    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        let year;
        if (name === "year") {
            year = value;
        } else {
            year = state.year;
        }

        let period;
        if (name === "period") {
            period = value;
        } else {
            period = state.period;
        }

        if (parseInt(period) === 1) {
            const beginDateString = `${year}-01-01`;
            const endDateString = `${year}-06-30`;
            setState({ 
                ...state,
                [name]: value,
                date: [beginDateString, endDateString],
                submitted: false,
            });
        } else if (parseInt(period) === 2) {
            const beginDateString = `${year}-07-01`;
            const endDateString = `${year}-12-31`;
            setState({ 
                ...state,
                [name]: value,
                date: [beginDateString, endDateString],
                submitted: false,
            });
        }
    };

    const getTableData = async() => {

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: username,
                shift: '',
                beginDate: state.date[0],
                endDate: state.date[1],
            });
            const data = request.data;
            if (!(data.length === 0)) {
                setState({
                    ...state,
                    results: data,
                    submitted: true,
                });
            } else {
                setState({
                    ...state,
                    results: [],
                    submitted: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();
        getTableData();
    };

    return (
        <React.Fragment>
            <FormEl onSubmit={handleSubmit}>
                <Title>
                    <h2>View Your Leave Requests</h2>
                    <p>View your leave requests for the specified leave period.</p>
                </Title>
                <ViewDiv>
                    <ViewGraphic />
                </ViewDiv>
                <Inputs>
                    <div>
                        <label htmlFor="period">Leave Period</label>
                        <select name="period" id="period" onChange={handleChange} value={state.period}>
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
                        <select name="year" id="year" onChange={handleChange} value={state.year}>
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
                {state.submitted && <ViewLeaveTable key="table" results={state.results} date={state.date} getTableData={getTableData} />}
            </AnimatePresence>
        </React.Fragment>
    );
}

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
