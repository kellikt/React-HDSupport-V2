import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
    useParams
} from 'react-router-dom';

import Heading from './Heading';
import { LayoutContext } from '../../../../LayoutContext';
import Timesheet from './Timesheet';
import MetricsTable from '../ClockMetrics/MetricsTable';

function Index() {
    const { username, payPeriod, year } = useParams();
    const { changeSize } = useContext(LayoutContext);
    const [state, setState] = useState({
        user: {},
        partial: {},
        weekOne: {},
        weekTwo: {},
        weekThree: {},
        grandTotals: [],
    });

    const getUserInfo = async() => {
        try {
            const request = axios.post(`${process.env.REACT_APP_DB_SERVER}/search-user.php`, {
                username: username,
                uuid: '',
                firstName: '',
                lastName: '',
            });
            const timesheetRequest = axios.post(`${process.env.REACT_APP_DB_SERVER}/get-timesheet-info.php`, {
                payPeriod: payPeriod,
                year: year,
                username: username,
            });
            const responses = await Promise.all([request, timesheetRequest]);
            setState({
                ...state,
                user: responses[0].data[0],
                partial: responses[1].data[3],
                weekOne: responses[1].data[0],
                weekTwo: responses[1].data[1],
                weekThree: responses[1].data[2],
                grandTotals: responses[1].data[4],
            });
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        changeSize();
        getUserInfo();
        return () => {
            changeSize();
        }
    }, []);

    return (
        <Container>
            <Heading 
                name={`${state.user.first_name} ${state.user.last_name}`}
                year={year}
                payPeriod={payPeriod}
                username={username}
                partialHours={state.partial.partial_week_hours_parsed}
            />
            <InfoContainer>
                <Timesheet weeks={[state.weekOne, state.weekTwo, state.weekThree]} totals={state.grandTotals} username={username} refreshData={getUserInfo} />
                <MetricsTable student={username} year={year} payPeriod={payPeriod} />
            </InfoContainer>
        </Container>
    );

}

export default Index;

const Container = styled.main`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const InfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-column-gap: 30px;

    .tableRow {
        border-top: none;
        padding: 12px 18px;

        &:nth-of-type(odd) {
            border-top: 3px solid #e4ebf4;
        }
    }

    .striped {
        background: #f6fafd;
    }
`;
