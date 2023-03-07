import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../../Button';
import TextInput from '../../../TextInput';

import { TableHeading, TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';

class LeaveForm extends Component {

    state = {
        slots: 0,
        links: [],
    }

    handleApprove = () => {
        const { lid, username, comment, beginDate, endDate, handleApprove } = this.props;
        handleApprove(lid, username, beginDate, endDate, comment);
    }

    handleDeny = () => {
        const { lid, comment, beginDate, endDate, handleDeny } = this.props;
        handleDeny(lid, beginDate, endDate, comment);
    }

    handleReset = () => {
        const { lid, beginDate, endDate, comment, status, handleReset } = this.props;

        handleReset(lid, beginDate, endDate, comment, status);
    }

    findPosition() {
        const { beginDate, endDate, firstName, conflict, priority, shift } = this.props;
        const start = new Date(`${beginDate} GMT-1000`);
        const end = new Date(`${endDate} GMT-1000`);
        let events = [];

        let position = 0;

        for (let j = 0; j < conflict.length; j++) {
            if (priority > conflict[j].priority) {
                position++;
            }
        }

        // append gcal w greatest position
        const startDay = `${start.getDate()}`.padStart(2, "0");
        const startMonth = `${start.getMonth() + 1}`.padStart(2, "0");
        const endDay = `${end.getDate()}`.padStart(2, "0");
        const endMonth =`${end.getMonth() + 1}`.padStart(2, "0");
        let startTime, endTime;

        if (parseInt(shift) === 1) {
            startTime = `T${170000 + (position * 10000)}Z`;
            endTime = `T${180000 + (position * 10000)}Z`;
        } else if (parseInt(shift) === 2) {
            startTime = `T${250000 + (position * 10000)}Z`;
            endTime = `T${260000 + (position * 10000)}Z`;
        } else if (parseInt(shift) === 3) {
            startTime = `T${160000 - (position * 10000)}Z`;
            endTime = `T${170000 - (position * 10000)}Z`;
        }

        let gcal;
        if (beginDate === endDate) {
            gcal = `https://www.google.com/calendar/render?action=TEMPLATE&text=${firstName}+${start.getMonth() + 1}/${start.getDate()}`;
        } else {
            gcal = `https://www.google.com/calendar/render?action=TEMPLATE&text=${firstName}+${start.getMonth() + 1}/${start.getDate()}-${end.getMonth() + 1}/${end.getDate()}`;
        }
        gcal += `&dates=${start.getFullYear()}${startMonth}${startDay}${startTime}/${end.getFullYear()}${endMonth}${endDay}${endTime}`;
        const options = {
            day: 'numeric',
            month: 'short'
        };

        const day = { dayString: `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)}`, link: gcal};
        events.push(day);

        return events;
    }



    async componentDidMount() {
        try {
            const { shift } = this.props;
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-staff.php?shift=${shift}`);
            const total = request.data;

            let min = 0;
            if (shift === 1) {
                min = 4;
            } else if (shift === 2 || shift === 3) {
                min = 1;
            }
            const slots = total.length - min;
            const links = this.findPosition();
            this.setState({
                slots: slots,
                links: links,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { comment, beginDate, endDate, conflict, status } = this.props;
        const { links } = this.state;
        
        return (
            <Request>
                {conflict.length > 0 ?
                    <ConflictSection>
                        <p>Conflicts with leave request:</p>
                        {conflict.map((result) => {
                            return (
                                <ConflictForm>
                                    <RedCross/>
                                    <span><strong>{result.first_name} {result.last_name}</strong></span>
                                    <span><strong>Priority:</strong> {result.priority}</span>
                                    <span><strong>Begin Date:</strong> {result.begin_date}</span>
                                    <span><strong>End Date:</strong> {result.end_date}</span>    
                                </ConflictForm>
                            );
                        })}
                    </ConflictSection>
                : 
                <NoConflict>
                    <p>No conflicts</p>
                    <Check />
                </NoConflict>
    
                }
                <Info>
                    <RequestedLeave>
                        <TextInput 
                            id="startDate"
                            label="Start Date"
                            value={beginDate}
                            name="startDate"
                            disabled
                        />
                        <Dash>-</Dash>
                        <TextInput 
                            id="endDate"
                            label="End Date"
                            value={endDate}
                            name="endDate"
                            disabled
                        />
                    </RequestedLeave>
                    <label>Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        ref={this.textarea}
                        value={comment}
                        disabled
                    />
                    {status === 2 ? 
                    <EventSection>
                        <DateTable>
                        <Heading>
                            <span>Date</span>
                            <span>GCal Link</span>
                        </Heading>
                        {links.map((link) => {
                        return (
                        <Row>
                            <span>{link.dayString}</span>
                             <a
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer" >
                                Create Google Calendar Event
                            </a>
                        </Row>
                        );
                        })}
                        </DateTable>
                        <Button color="red" onClick={this.handleReset}>Revoke Approval</Button>
                    </EventSection>
                     : ''}
                    {status === 0 &&
                        <Buttons>
                            <Button color="red" onClick={this.handleDeny}>Deny</Button>
                            <Button color="blue" onClick={this.handleApprove}>Approve</Button>
                        </Buttons>
                    }
                    {status === 1 &&
                    <Button color="blue" onClick={this.handleReset}>Revoke Deny</Button>}
                </Info>
            </Request>
        );

    }
}

LeaveForm.propTypes = {
    beginDate: PropTypes.string,
    endDate: PropTypes.string,
    priority: PropTypes.number,
    comment: PropTypes.string,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    shift: PropTypes.number,
    lid: PropTypes.number.isRequired,
    conflict: PropTypes.array,
    status: PropTypes.number,
    handleDeny: PropTypes.func.isRequired,
    handleApprove: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
}

export default LeaveForm;

const RedCross = styled(Cross)`
    width: 50px;
    height: 50px;
`;

const Dash = styled.div`
    line-height: 120px;
`;

const RequestedLeave = styled.div`
    cursor: not-allowed;
    grid-column: 1/-1;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: 10px; 

    @media (max-width: 500px) {
        grid-column: 1;
    }
`;

const Buttons = styled.div`
    grid-column: 3/-1
    flex-direction: row;
    display: flex;

    @media (max-width: 1220px) {
        grid-column: 4;
    }
    @media (max-width: 500px) {
        grid-column: 1;
    }
`;

const Request = styled.div`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 18px;
    grid-row-gap: 30px;
    align-items: center;

    button {
        grid-column: 2;
        margin-right: 0;
        margin-left: auto;
        
        @media (max-width: 1220px) {
            margin-left: 12px;
        }
    }
    @media (max-width: 1220px) {
        grid-template-columns: 1fr;
    }
`;

const Info = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;

    textarea {
        grid-column: 1/-1;
        cursor: not-allowed;

        @media (max-width: 500px) {
            grid-column: 1;
        }
    }

    >label {
        line-height: 0.5;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 2px;
        padding-left: 10px;

        @media (max-width: 500px) {
            grid-column: 1;
        }
    }
    >button {
        grid-column: 3/5;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }

    >button {
        @media (max-width: 500px) {
            grid-column: 1;
        }
    }
`;

const ConflictSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    @media (max-width: 500px) {
        grid-column: 1;
    }
`;

const ConflictForm = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 1fr 1fr;
    text-align: center;
`;

const Row = styled(TableRow)`
    grid-column: 1/-1;
    grid-template-columns: 1fr 1fr;
`;

const DateTable = styled.div`
    display: grid;
    grid-column: 1/-1;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
`;

const EventSection = styled.div`
    grid-column: 1/-1;
    grid-row-gap: 10px;
    display: grid;

    >button {
        grid-column: 1;
        float: right;
    }
`;

const NoConflict = styled.div`
    text-align: center; 
    >p {
        text-align: center;
    }
    >svg {
        width: 250px;
    }
`;