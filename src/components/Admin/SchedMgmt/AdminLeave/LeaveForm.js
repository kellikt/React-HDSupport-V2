import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../../Button';
import TextInput from '../../../TextInput';

import { TableHeading, TableRow } from '../ClockMetrics/MetricsTableComponents';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';

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
        const { beginDate, endDate, firstName, conflict, priority } = this.props;
        const start = new Date(beginDate);
        const end = new Date(endDate);
        const days = (((end.getTime()/1000) - (start.getTime()/1000)) / 3600 / 24) + 1;
        let events = [];
        let curr = start;

        for (let i = 0; i < days; i++) {
            
            let position = 0;

            // get position

            for (let j = 0; j < conflict.length; j++) {
                const conflictStart = new Date(conflict[j].begin_date);
                const conflictEnd = new Date(conflict[j].end_date);

                if ((curr >= conflictStart && curr <= conflictEnd) || (curr >= conflictStart && curr <= conflictEnd) || (curr <= conflictStart && curr >= conflictEnd)) {
                    if (priority > conflict[j].priority) {
                        position++;
                    }
                }
            }

            // append gcal w position
            const startDay = `${curr.getDate() + 1}`.padStart(2, "0");
            const startMonth = `${curr.getMonth() + 1}`.padStart(2, "0");
            const startTime = `T${170000 + (position * 10000)}Z`;
            const endTime = `T${180000 + (position * 10000)}Z`;
            const gcal = `https://www.google.com/calendar/render?action=TEMPLATE&text=${firstName}+${curr.getMonth() + 1}/${curr.getDate() + 1}&dates=${start.getFullYear()}${startMonth}${startDay}${startTime}/${start.getFullYear()}${startMonth}${startDay}${endTime}`;
            const day = { dayString: `${startMonth}/${startDay}`, link: gcal};
            events.push(day);
            // increment to next day
            curr.setDate(curr.getDate() + 1);
        }
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
        const { comment, beginDate, endDate, firstName, conflict, status } = this.props;
        const { links } = this.state;
        const start = new Date(beginDate);
        const end = new Date(endDate);

        const startDay = `${start.getDate() + 1}`.padStart(2, "0");
        const startMonth = `${start.getMonth() + 1}`.padStart(2, "0");

        const endDay = `${end.getDate() + 1}`.padStart(2, "0");
        const endMonth = `${end.getMonth() + 1}`.padStart(2, "0");

        let link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${firstName}+`;

        if (beginDate != endDate) {
            link += `${start.getMonth() + 1}/${start.getDate() + 1}-${start.getMonth() + 1}/${start.getDay()}&dates=${start.getFullYear()}${startMonth}${startDay}T170000Z/${end.getFullYear()}${endMonth}${endDay}T170000Z`;
        } else {
            link+= `${start.getMonth() + 1}/${start.getDate() + 1}&dates=${start.getFullYear()}${startMonth}${startDay}T170000Z/${end.getFullYear()}${endMonth}${endDay}T170000Z`;
        }

        
        return (
            <Request>
                {conflict.length > 0 ?
                    <ConflictSection>
                        <p>Conflicts with leave request:</p>
                        {conflict.map((result) => {
                            return (
                                <ConflictForm>
                                    <span>{result.first_name} {result.last_name}</span>
                                    <span>Priority: {result.priority}</span>
                                    <span>Begin Date: {result.begin_date}</span>
                                    <span>End Date: {result.end_date}</span>    
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
                        />
                        <Dash>-</Dash>
                        <TextInput 
                            id="endDate"
                            label="End Date"
                            value={endDate}
                            name="endDate"
                        />
                    </RequestedLeave>

                    <textarea
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

const Dash = styled.div`
    line-height: 120px;
`;

const RequestedLeave = styled.div`
    cursor: not-allowed;
    grid-column: 1/-1;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: 10px; 

`;

const Buttons = styled.div`
    grid-column: 3/-1
    flex-direction: row;
    display: flex;
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
    }
`;

const ConflictSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
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