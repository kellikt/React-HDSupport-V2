import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import axios from 'axios';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';

import { FormEl, DisplayTitle, DisplayInputs } from '../Announcements/AnnouncementsComponents';
import Button from '../../../Button';
import DisplayAnnounceTable from './DisplayAnnounceTable';

function DisplayAnnounceForm() {
    const [state, setState] = useState({
        date: [new Date(), new Date()],
        submitted: false,
        results: [],
    });

    const handleDate = (date) => {
        setState({
            ...state,
            date: date,
        });
    }

    const getTableData = async() => {
        try {
            const openDateString = `${state.date[0].getFullYear()}-${
                state.date[0].getMonth() + 1
            }-${state.date[0].getDate()}`;
            const closeDateString = `${state.date[1].getFullYear()}-${
                state.date[1].getMonth() + 1
            }-${state.date[1].getDate()}`;

            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-manual-announcements.php`, {
                openDate: openDateString,
                closeDate: closeDateString,
            });

            const data = request.data;
            if (data) {
                console.log(data);
                setState({
                    ...state,
                    submitted: true,
                    results: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        getTableData();
    }

    return (
        <React.Fragment>
            <FormEl onSubmit={handleSubmit}>
                <DisplayTitle>
                    <h2>Display Announcements</h2>
                    <p>Show a list of active announcements for the specified date range.</p>
                </DisplayTitle>
                <DisplayInputs color="cyan">
                    <h3>Date Range:</h3>
                    <DateRangerPicker value={state.date} calendarType="US" onChange={handleDate} />
                </DisplayInputs>
                <DisplayButton color="cyan">Display Announcements</DisplayButton>
            </FormEl>
            <AnimatePresence>
                {state.submitted && <DisplayAnnounceTable key="table" results={state.results} date={state.date} getTableData={getTableData} />}
            </AnimatePresence>
        </React.Fragment>
    );
}

export default DisplayAnnounceForm;

const DisplayButton = styled(Button)`
    grid-column: 2;
    margin-right: 0;
    margin-left: auto;
    max-width: 250px;
`;
