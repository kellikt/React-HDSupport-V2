import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Button from '../../../Button';
import { StatusBox } from './AdminLeaveComponents';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg'; 
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';
import { ReactComponent as Exclamation } from '../../../../images/icons/WarningExclamation.svg';

export default function ManagerActions(props) {

    const [comment, setComment] = useState('');

    const renderRequestStatus = () => {
        if (props.status == 0) {
            return (
                <React.Fragment>
                    <Exclamation />
                    <p>Pending</p>
                </React.Fragment>
            );
        } else if (props.status == 1) {
            return (
                <React.Fragment>
                    <Cross />
                    <p>Denied</p>
                </React.Fragment>
            );
        } else if (props.status == 2) {
            return (
                <React.Fragment>
                    <Check />
                    <p>Approved</p>
                </React.Fragment>
            );
        }
    }

    const handleChange = event => {
        setComment(event.target.value);
    }

    const handleEdit = () => {
        props.handleEdit(props.lid, props.beginDate, props.endDate, props.status, props.comment, comment);
    }

    const handleApprove = () => {
        props.handleApprove(props.lid, props.username, props.beginDate, props.endDate, props.comment, comment);
    }

    const handleDeny = () => {
        props.handleDeny(props.lid, props.beginDate, props.endDate, props.comment, comment);
    }

    const handleReset = () => {
        props.handleReset(props.lid, props.beginDate, props.endDate, props.comment, props.status, comment);
    }

    const createGCalLink = () => {
        const start = new Date(`${props.beginDate} GMT-1000`);
        const end = new Date(`${props.endDate} GMT-1000`);

        let position = 0;

        for (let j = 0; j < props.conflict.length; j++) {
            if (props.priority > props.conflict[j].priority) {
                position++;
            }
        }

        // append gcal w greatest position
        const startDay = `${start.getDate()}`.padStart(2, "0");
        const startMonth = `${start.getMonth() + 1}`.padStart(2, "0");
        const endDay = `${end.getDate()}`.padStart(2, "0");
        const endMonth =`${end.getMonth() + 1}`.padStart(2, "0");
        let startTime, endTime;

        if (parseInt(props.shift) === 1) {
            startTime = `T${170000 + (position * 10000)}Z`;
            endTime = `T${180000 + (position * 10000)}Z`;
        } else if (parseInt(props.shift) === 2) {
            startTime = `T${250000 + (position * 10000)}Z`;
            endTime = `T${260000 + (position * 10000)}Z`;
        } else if (parseInt(props.shift) === 3) {
            startTime = `T${160000 - (position * 10000)}Z`;
            endTime = `T${170000 - (position * 10000)}Z`;
        }

        let gcal;
        if (props.beginDate === props.endDate) {
            gcal = `https://www.google.com/calendar/render?action=TEMPLATE&src=c_gjs3u1vu768u14f91kqqr1bc4s@group.calendar.google.com&text=${props.firstName}+${start.getMonth() + 1}/${start.getDate()}`;
        } else {
            gcal = `https://www.google.com/calendar/render?action=TEMPLATE&src=c_gjs3u1vu768u14f91kqqr1bc4s@group.calendar.google.com&text=${props.firstName}+${start.getMonth() + 1}/${start.getDate()}-${end.getMonth() + 1}/${end.getDate()}&recur=RRULE:FREQ%3DDAILY;INTERVAL=1;UNTIL=${end.getFullYear()}${endMonth}${endDay}${endTime}`;
        }
        gcal += `&dates=${start.getFullYear()}${startMonth}${startDay}${startTime}/${end.getFullYear()}${startMonth}${startDay}${endTime}`;
        const options = {
            day: 'numeric',
            month: 'short'
        };

        const day = { dayString: `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)}`, link: gcal};
        return day;
    }

    const gcal = createGCalLink();

    useEffect(() => {
        if (props.staffComment) {
            setComment(props.staffComment);
        } else {
            setComment('');
        }
    }, [props.lid]);

    return (
        <Container
        key={props.lid}
        initial={{
            y: 50,
            opacity: 0,
        }}
        animate={{
            y: 0,
            opacity: 1,
            delay: 0.8,
            transition: {
                duration: 0.8,
                ease: 'easeIn',
            },
        }}
        >
            <StatusBox
            key={props.status}
            initial={{
                y: 50,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
                delay: 0.8,
                transition: {
                    duration: 0.8,
                    ease: 'easeIn',
                },
            }}
            >
                {renderRequestStatus()}
            </StatusBox>
            <h2>Manager Actions</h2>
            <p>Approve or deny the current leave request.</p>
            <Comment>
                <label>Manager Comments</label>
                <textarea onChange={handleChange} value={comment}/>
            </Comment>
            {props.status === 0 &&
                <Buttons>
                    <Button color="red" onClick={handleDeny}>Deny</Button>
                    <Button color="blue" onClick={handleApprove}>Approve</Button>
                </Buttons>
            }
            {props.status === 1 &&
                <Buttons>
                    <Button color="gold" onClick={handleEdit}>Edit Comment</Button>
                    <Button color="blue" onClick={handleReset}>Revoke Deny</Button>
                </Buttons>
            }
            {props.status === 2 &&
            <div>
                <a
                    href={gcal.link}
                    target="_blank"
                    rel="noopener noreferrer" >
                    Create Google Calendar Event
                </a>
                <Buttons>
                    <Button color="gold" onClick={handleEdit}>Edit Comment</Button>
                    <Button color="blue" onClick={handleReset}>Revoke Approval</Button>
                </Buttons>
            </div>
            }
        </Container>
    );
}

const Container = styled(motion.div)`
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    margin-top: 24px;
    padding: 10px 30px 30px 30px;
    border-top: 6px solid #e39f48;
    background: var(--white);

    h2 {
        font-weight: 700;
        color: var(--gold);
    }

    p {
        color: var(--dark-grey);
    }
    >div {
        >a {
            line-height: 4;
        }
    }
`;
const Buttons = styled.div`
    margin: 10px auto 0px 0px;
    float: right;
    display: inline;

    >button:nth-of-type(1) {
        margin-right: 10px;
    }
`;

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    label {
        line-height: 1;
        font-weight: 400;
        font-size :14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        border-radius: 15px;
        padding: 15px;
        height: 222px;
    }
`;