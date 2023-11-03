import React, { useEffect, useState, useContext } from 'react';
import {
    useParams
} from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../../Button';
import LeaveInfo from './LeaveInfo';
import ManagerActions from './ManagerActions';
import { ConflictTable } from './ConflictTable';
import SnackbarPortal from '../../../SnackbarPortal';
import { LayoutContext } from '../../../../LayoutContext';
import { Selectors } from '../../SchedMgmt/Timesheet/Timesheet';

function AdminLeave() {
    const { user, startDate, endDate, shift } = useParams();
    const { changeSize, firstName, username } = useContext(LayoutContext);
    const [state, setState] = useState({
        results: [],
        currentLeave: [],
        index: 0,
        focusedLeave: {
            begin_date: '',
            comment: '',
            end_date: '',
            first_name: '',
            last_name: '',
            lid: '',
            priority: '',
            status: '',
            uid: '',
        },
        priority: 0,
    });
    const [snack, setSnack] = useState({
        handler: false,
        heading: '',
        message: '',
        isError: false,
    });

    const handleSnack = () => {
        setSnack({
            ...snack,
            handler: false,
        });
    }

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
                username: user,
                beginDate: startDate,
                endDate: endDate,
                shift: shift,
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
                    focusedLeave: data[0].data[state.index],
                    results: data[1].data,
                    priority: data[0].data[0].priority,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async(lid, beginDate, endDate, status, comment, staffComment) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: status,
                staffComment: staffComment,
            });
            await getLeaveData();
            setSnack({
                ...snack,
                handler: true,
                heading: 'Success!',
                message: 'Successfully edited comment.'
            });
            setTimeout(() => {
                handleSnack();
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const handleApprove = async(lid, username, beginDate, endDate, comment, staffComment) => {
        try {

            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: 2,
                staffComment: staffComment,
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

    const handleDeny = async(lid, beginDate, endDate, comment, staffComment) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: 1,
                staffComment: staffComment,
            });
            await getLeaveData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = async(lid, beginDate, endDate, comment, approve, staffComment) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: 0,
                staffComment: staffComment,
            });
            if (approve === 2) {
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-schedule-changes.php`, {
                    username: user,
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

    const changeRequest = index => {
        setState({
            ...state,
            index: index,
            focusedLeave: state.currentLeave[index],
        });
    }

    const sendRecap = async() => {

        // subject
        const subject = `Leave Request Recap - ${startDate} to ${endDate}`;

        // to / from

        const to = `${user}@hawaii.edu`;

        const from = `${username}@hawaii.edu`;

        // build email content
        let content = `<p>Hello ${state.focusedLeave.first_name},</p>
        <p>Here is the status of your leave requests from ${startDate} to ${endDate}:</p>
        `;

        state.currentLeave.forEach((leave) => {
            content += `<p><strong>${leave.begin_date == leave.end_date ? `${leave.begin_date}` : `${leave.begin_date} to ${leave.end_date}`}</strong>: ${leave.status == 0 ? 'Pending' : leave.status == 1 ? 'Denied' : leave.status == 2 ? 'Approved' : 'Error'}
            ${leave.staff_comment.length > 0 ? `<br><strong>Manager comments</strong>: ${leave.staff_comment}</p>` : '</p>'}`;
        });

        content += `<p>Thanks,<br>${firstName}</p>`;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                from: from,
                to: to,
                subject: subject,
                body: content,
            });
            if (request.data) {
                setSnack({
                    ...snack,
                    handler: true,
                    heading: 'Success!',
                    isError: false,
                    message: 'Successfully sent recap email.'
                });
                setTimeout(() => {
                    handleSnack();
                }, 3000)
            } else {
                setSnack({
                    ...snack,
                    handler: true,
                    heading: 'Error',
                    isError: true,
                    message: 'Error sending recap email.'
                });
                setTimeout(() => {
                    handleSnack();
                }, 3000)
            }
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
        changeSize();
        return () => {
            changeSize();
        }
    }, []);

    return (
            <Container>
                <Title>
                <h2>Leave Requests for: {user}</h2>
                <Button color="gold" onClick={sendRecap}>Send Recap Email</Button>
                <span>Priority <span>{state.priority}</span></span>
                <span>Total Leave Requests <span>{state.currentLeave.length}</span></span>
                <span>Date Range<span>{startDate} to {endDate}</span></span>
                </Title>
                <LeaveHeading>
                    <LeaveSelectors>
                        {state.currentLeave.map((result, index) => {
                            if (index == state.index) {
                                return (
                                    <button key={index} onClick={() => changeRequest(index)} className="active">
                                        {result.begin_date == result.end_date ? <p>{result.begin_date.substring(5)}</p> : <p>{result.begin_date.substring(5)} - {result.end_date.substring(5)}</p>}
                                    </button>
                                );
                            } else {
                                return (
                                    <button key={index} onClick={() => changeRequest(index)}>
                                        {result.begin_date == result.end_date ? <p>{result.begin_date.substring(5)}</p> : <p>{result.begin_date.substring(5)} - {result.end_date.substring(5)}</p>}
                                    </button>
                                );
                            }
                        })}
                    </LeaveSelectors>
                </LeaveHeading>
                    <LeaveActions>
                        <AnimatePresence>
                            <LeaveInfo
                                lid={state.focusedLeave.lid}
                                conflict={getConflict(state.focusedLeave.begin_date, state.focusedLeave.end_date, state.focusedLeave.lid)}
                                startDate={state.focusedLeave.begin_date}
                                endDate={state.focusedLeave.end_date}
                                comment={state.focusedLeave.comment}
                            />
                        </AnimatePresence>
                            <ManagerActions 
                                lid={state.focusedLeave.lid}
                                status={state.focusedLeave.status}
                                username={user}
                                shift={shift}
                                priority={state.focusedLeave.priority}
                                firstName={state.focusedLeave.first_name}
                                lastName={state.focusedLeave.last_name}
                                beginDate={state.focusedLeave.begin_date}
                                endDate={state.focusedLeave.end_date}
                                comment={state.focusedLeave.comment}
                                staffComment={state.focusedLeave.staff_comment}
                                conflict={getConflict(state.focusedLeave.begin_date, state.focusedLeave.end_date, state.focusedLeave.lid)}
                                handleEdit={handleEdit}
                                handleDeny={handleDeny}
                                handleApprove={handleApprove}
                                handleReset={handleReset}
                            />
                    </LeaveActions>
                    <SnackbarPortal 
                        handler={snack.handler}
                        message={snack.message}
                        onClick={handleSnack}
                        isError={snack.isError}
                        heading={snack.heading}
                    />
                {getConflict(state.focusedLeave.begin_date, state.focusedLeave.end_date, state.focusedLeave.lid).length > 0 && 
                    <AnimatePresence>
                        <ConflictTable 
                            key={state.focusedLeave.lid}
                            lid={state.focusedLeave.lid}
                            priority={state.focusedLeave.priority}
                            beginDate={state.focusedLeave.begin_date}
                            endDate={state.focusedLeave.end_date}
                            conflict={getConflict(state.focusedLeave.begin_date, state.focusedLeave.end_date, state.focusedLeave.lid)}
                        />
                    </AnimatePresence>
                }
        </Container>
    );
}

export default AdminLeave;

const LeaveActions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px; 

    @media only screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const LeaveHeading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 20px;
    max-width: 1200px;
    margin: 0px auto 30px auto;
    width: 100%;
`;

const LeaveSelectors = styled(Selectors)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    >button {
        margin: 25px 20px 0px 0px;
    }
`;

const Container = styled.main`
    display: flex;
    flex-direction: column;
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
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1200px;
    margin: 30px auto 0px auto;
    width: 100%;
    >h2 {
        grid-column: 1/3;
    }
    >button {
        max-width: 200px;
        max-height: 50px;
        margin-right: 0;
        margin-left: auto;
        grid-column: 3;
    }
    >span {
        display: flex;
        flex-direction: column;
        color: #6b7c93;
        margin-bottom: 10px;

        >span {
            margin-top: 10px;
            font-style: italic;
            font-weight: 500;
            font-size: 18px;
        }
        @media (max-width: 500px) {
            grid-column: 1;
            margin-right: auto;
            margin-left: 0;
        }
    }
    >span:nth-child(3) {
        >span {
            color: var(--gold);
        }
    }
    >span:nth-child(4) {
        text-align: center;
        >span {
            color: var(--light-blue);
        }
        @media (max-width: 500px) {
            text-align: left;
        }
    }
    >span:nth-child(5) {
        margin-right: 0px;
        margin-left: auto;
        >span {
            color: var(--blue);
        }
    }
    border-bottom: 2px solid #bcdaff52;

    @media only screen and (max-width: 650px) {
        >button {
            grid-column: 1/-1;
        }
    }
`;