import React, { useEffect, useState } from 'react';
import {
    useParams
} from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

import LeaveForm from './LeaveForm';

function AdminLeave() {
    const { username, startDate, endDate, shift } = useParams();
    const [state, setState] = useState({
        results: [],
        currentLeave: [],
        priority: 0,
    });

    const getConflict = (beginDate, endDate, lid) => {

        const checkConflicts = state.results.filter((result) => {
            if (((beginDate >= result.begin_date && beginDate <= result.end_date) || (endDate >= result.begin_date && endDate <= result.end_date) || (beginDate <= result.begin_date && endDate >= result.end_date)) && result.lid !== lid) {
                return true;
            } else {
                return false;
            }
        });

        if (checkConflicts.length > 0) {
            return checkConflicts;
        } else {
            return [];
        }
    }

    const getLeaveData = async() => {
        try {
            const current = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: username,
                beginDate: startDate,
                endDate: endDate,
            });
            const total = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-leave-requests.php`, {
                username: '',
                beginDate: startDate,
                endDate: endDate,
                shift: shift,
            });
            const data = await Promise.all([ current, total ]);
            if (!(data === 0)) {
                setState({
                    ...state,
                    currentLeave: data[0].data,
                    results: data[1].data,
                    priority: data[0].data[0].priority,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleApprove = async(lid, username, beginDate, endDate, comment) => {
        try {

            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: 2,
            });

            // create schedule change
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-schedule-change.php`, {
                username: username,
                reason: 'Vacation',
                startDate: beginDate,
                endDate: endDate,
            });
            await getLeaveData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeny = async(lid, beginDate, endDate, comment) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate,
                comment: comment,
                status: 1,
            });
            await getLeaveData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = async(lid, beginDate, endDate, comment, approve) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate,
                comment: comment,
                status: 0,
            });
            if (approve === 2) {
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-schedule-changes.php`, {
                    username: username,
                    beginDate: beginDate,
                    endDate: endDate,
                    option: '',
                });

                const schedule = request.data[0];

                await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-schedule-change.php`, {
                    sid: schedule.sid,
                });
            }
            await getLeaveData();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            getLeaveData();
        } catch(error) {
            console.log(error);
        }
    }, []);

    return (
        <Container>
            <Title>
            <h2>Leave Requests for: {username}</h2>
            <span><strong>Priority:</strong> {state.priority}</span>
            <span><strong>Date Range:</strong> {startDate} to {endDate}</span>
            </Title>
            {state.currentLeave.map((result) => {
                return (
                    <LeaveForm
                        key={result.lid}
                        username={username}
                        firstName={result.first_name}
                        lastName={result.last_name}
                        shift={shift}
                        lid={result.lid}
                        priority={result.priority}
                        beginDate={result.begin_date}
                        endDate={result.end_date}
                        comment={result.comment}
                        status={result.status}
                        conflict={getConflict(result.begin_date, result.end_date, result.lid)}
                        handleDeny={handleDeny}
                        handleApprove={handleApprove}
                        handleReset={handleReset}
                    />
                );
            })}
        </Container>
    );
}

export default AdminLeave;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    padding: 0 20px;
    width: 100%;
    margin: 30px auto;

    h2 {
        font-size: 32px;
        font-weight: 500;
    }
`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    >span {
        color: #6b7c93;
        margin-top: 32px;
        margin-bottom: 32px;
        margin-right: 0;
        margin-left: auto;
        @media (max-width: 500px) {
            grid-column: 1;
            margin-right: auto;
            margin-left: 0;
        }
    }
    >span:nth-child(3) {
        grid-column: 2;
        margin-top: 0px;
        margin-bottom: 10px;
    }
    border-bottom: 2px solid #bcdaff52;
`;