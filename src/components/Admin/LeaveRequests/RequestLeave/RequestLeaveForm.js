import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import { FormEl, Title, RequestInputs, RequestDateRangerPicker } from './RequestLeaveComponents';
import Button from '../../../Button';
import { LayoutContext } from '../../../../LayoutContext';
import SnackbarPortal from '../../../SnackbarPortal';

function RequestLeaveForm() {
    const { username } = useContext(LayoutContext);
    const [state, setState] = useState({
        date: [new Date(), new Date()],
        minDate: new Date(),
        maxDate: new Date(),
        period: 1,
        year: 0,
        openDate: new Date(),
        closeDate: new Date(),
        openPeriod: false,
        current: new Date(),
        username: '',
        leaveText: '',
        comment: '',
        submitted: false,
        error: false,
        messageHeading: '',
        message: '',
    });

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setState({
            ...state,
            [name]: value,
        });
    };

    const handleDate = (date) => {
        setState({
            ...state,
            date: date,
        });
    };

    const handleSnack = () => {
        setState({
            ...state,
            submitted: false,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const startDateString = `${state.date[0].getFullYear()}-${
            state.date[0].getMonth() + 1
        }-${state.date[0].getDate()}`;
        const endDateString = `${state.date[1].getFullYear()}-${
            state.date[1].getMonth() + 1
        }-${state.date[1].getDate()}`;

        try {
            const status = 0;
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-leave-request.php`, {
                username: username,
                beginDate: startDateString,
                endDate: endDateString,
                comment: state.comment,
                status: status,
            });
            const data = request.data;

            if (data) {
                setState({
                    ...state,
                    submitted: true,
                    message: 'Successfully submitted leave request.',
                    messageHeading: 'Success!',
                    error: false,
                    comment: '',
                });
            } else {
                setState({
                    ...state,
                    submitted: true,
                    message: 'Failed to submit leave reuqest.',
                    messageHeading: 'Error!',
                    error: true,
                });
            }
            const timeoutId = setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const getLeavePeriod = async () => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-leave-period.php`);
            const data = request.data;
            setState({
                ...state,
                openPeriod: data.open_period,
                openDate: new Date(data.open_date),
                closeDate: new Date(data.close_date),
                period: data.period,
                year: data.year,
            });
            const currentDate = new Date();
            if (data.period == 1) {
                const startDate = new Date(data.year + 1, 0);
                const endDate = new Date(data.year + 1, 5);
                const maxDate = new Date(data.year + 1, 5, 30);
                setState({
                    ...state,
                    leaveText: `${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.toLocaleString(
                        'default',
                        { month: 'long' }
                    )} ${endDate.getFullYear()}`,
                    date: [startDate, startDate],
                    minDate: startDate,
                    maxDate: maxDate,
                });
            } else {
                const startDate = new Date(currentDate.getFullYear() + 1, 6);
                const endDate = new Date(currentDate.getFullYear() + 1, 11);
                const maxDate = new Date(currentDate.getFullYear() + 1, 11, 31);
                setState({
                    ...state,
                    leaveText: `${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.toLocaleString(
                        'default',
                        { month: 'long' }
                    )} ${endDate.getFullYear()}`,
                    date: [startDate, startDate],
                    minDate: startDate,
                    maxDate: maxDate,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLeavePeriod();
    }, []);

    return (
        <div>
            {state.openPeriod && (
                <FormEl onSubmit={handleSubmit}>
                    <RequestTitle>
                        <h2>Submit a Leave Request</h2>
                        <p>Submit a leave request for leave period {state.leaveText}</p>
                    </RequestTitle>
                    <RequestInputs color="pink">
                        <h3>Date Range:</h3>
                        <RequestDateRangerPicker
                            onChange={handleDate}
                            value={state.date}
                            minDate={state.minDate}
                            maxDate={state.maxDate}
                            calendarType="US"
                        />
                    </RequestInputs>
                    <textarea
                        name="comment"
                        value={state.comment}
                        onChange={handleChange}
                        placeholder="Comments regarding leave request"
                    />
                    <Button color="pink">Submit Request</Button>
                    <SnackbarPortal
                        handler={state.submitted}
                        message={state.message}
                        heading={state.messageHeading}
                        isError={state.error}
                        onClick={handleSnack}
                    />
                </FormEl>
            )}
            {!state.openPeriod &&
            <FormEl>
                <RequestTitle>
                    <h2>Leave Requests Unavailable</h2>
                    <p>The period to submit leave requests is currently closed.</p>
                </RequestTitle>
            </FormEl>
            }
        </div>
    );
}

export default RequestLeaveForm;

const RequestTitle = styled(Title)`
    h2 {
        color: var(--pink);
    }
`;
