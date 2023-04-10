import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { FormEl, Title, Inputs } from '../ViewLeave/ViewLeaveComponents';

import Button from '../../../Button';
import AdminViewLeaveTable from './AdminViewLeaveTable';

import { ReactComponent as Manage } from '../../../../images/Admin/Leave/ManageLeave.svg';

function AdminViewLeaveForm() {

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const [state, setState] = useState({
        period: '',
        year: '',
        date: [(new Date()).toLocaleString('en-CA', options), (new Date()).toLocaleString('en-CA', options)],
        shift: "1",
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

        let newPeriod;
        if (name === "period") {
            newPeriod = value;
        } else {
            newPeriod = state.period;
        }

        if (parseInt(newPeriod) === 1) {
            const beginDateString = `${year}-01-01`;
            const endDateString = `${year}-06-30`;
            setState({ 
                ...state,
                [name]: value,
                date: [beginDateString, endDateString],
                submitted: false,
            });
        } else if (parseInt(newPeriod) === 2) {
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
                username: '',
                shift: state.shift,
                beginDate: state.date[0],
                endDate: state.date[1],
            });
            const data = request.data;
            const usernames = [...new Set(data.map(item => item.username))];
            let res = [];

            usernames.forEach(function(user) {
                res.push(data.filter(item => item.username === user));
            });

            if (!(data === 0)) {
                setState({
                    ...state,
                    results: res,
                    submitted: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <FormEl onSubmit={handleSubmit}>
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
                    <div>
                        <label htmlFor="shift">Shift</label>
                        <select name="shift" id="shift" onChange={handleChange} value={state.shift}>
                            <option value="None">Select Shift</option>
                            <option value="1">1st Shift</option>
                            <option value="2">2nd Shift</option>
                            <option value="3">3rd Shift</option>
                        </select>
                    </div>
                </AdminInputs>
                <Button color="light-blue">Display Requests</Button>
            </FormEl>
            <AnimatePresence>
                {state.submitted && <AdminViewLeaveTable key="table" date={state.date} shift={state.shift} results={state.results} />}
            </AnimatePresence>
        </React.Fragment>
    );
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
