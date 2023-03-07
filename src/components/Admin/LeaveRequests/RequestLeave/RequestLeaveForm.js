import React, { Component } from 'react';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';
import axios from 'axios';
import styled from 'styled-components';

import { FormEl, Title } from './RequestLeaveComponents';
import { DateInputs } from '../../SchedMgmt/ScheduleChange/ChangeFormComponents';
import Button from '../../../Button';
import { LayoutContext } from '../../../../LayoutContext';
import SnackbarPortal from '../../../SnackbarPortal';

class RequestLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [new Date(), new Date()],
            minDate: new Date(),
            maxDate: new Date(),
            username: '',
            leaveText: '',
            comment: '',
            submitted: false,
            error: false,
            messageHeading: '',
            message: '',
        };
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
        });
    };

    handleDate = date => {
        this.setState({ date: date });
    };
    
    handleSnack = () => {
        this.setState({
            submitted: false,
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { comment, date } = this.state;
        const { username } = this.context;
        const startDateString = `${date[0].getFullYear()}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
        const endDateString = `${date[1].getFullYear()}-${date[1].getMonth() + 1}-${date[1].getDate()}`;

        try {
          const status = 0;
          const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-leave-request.php`, {
              username: username,
              beginDate: startDateString,
              endDate: endDateString,
              comment: comment,
              status: status,
          });
          const data = request.data;

          if (data) {
              this.setState({
                  submitted: true,
                  message: 'Successfully submitted leave request.',
                  messageHeading: 'Success!',
                  error: false,
                  comment: '',
              });
          } else {
              this.setState({
                  submitted: true,
                  message: 'Failed to submit leave reuqest.',
                  messageHeading: 'Error!',
                  error: true,
              });
          }
          this.timeoutId = setTimeout(() => {
              this.handleSnack();
          }, 3000);
        } catch(error) {
            console.log(error);
        }
    };

    componentWillUnmount() {
        window.clearTimeout(this.timeoutId);
    }
    componentDidMount() {
        // determine current leave period
        const currentDate = new Date();

        if (currentDate.getMonth() <= 5) {
            const startDate = new Date(currentDate.getFullYear() + 1, 0);
            const endDate = new Date(currentDate.getFullYear() + 1, 5);
            const maxDate = new Date(currentDate.getFullYear() + 1, 5, 30);
            this.setState({
                leaveText: `${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.toLocaleString('default', { month: 'long' })} ${endDate.getFullYear()}`,
                date: [startDate, startDate],
                minDate: startDate,
                maxDate: maxDate,
            });
        } else {
            const startDate = new Date(currentDate.getFullYear() + 1, 6);
            const endDate = new Date(currentDate.getFullYear() + 1, 11);
            const maxDate = new Date(currentDate.getFullYear() + 1, 11, 31);
            this.setState({
                leaveText: `${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.toLocaleString('default', { month: 'long' })} ${endDate.getFullYear()}`,
                date: [startDate, startDate],
                minDate: startDate,
                maxDate: maxDate,
            });
        }
        
    }

    render() {
        const { comment, date, leaveText, minDate, maxDate, submitted, message, messageHeading, error } = this.state;

        return (
            <FormEl onSubmit={this.handleSubmit}>
                <RequestTitle>
                    <h2>Submit a Leave Request</h2>
                    <p>Submit a leave request for {leaveText}</p>
                </RequestTitle>
                <RequestInputs color="pink">
                    <h3>Date Range:</h3>
                    <DateRangerPicker onChange={this.handleDate} value={date} minDate={minDate} maxDate={maxDate} calendarType="US" />
                </RequestInputs>
                <textarea
                    name="comment"
                    ref={this.textarea}
                    value={comment}
                    onChange={this.handleChange}
                    placeholder="Comments regarding leave request"
                />
                <Button color="pink">Submit Request</Button>
                <SnackbarPortal
                    handler={submitted}
                    message={message}
                    heading={messageHeading}
                    isError={error}
                    onClick={this.handleSnack}
                />
            </FormEl>
        );
    }
}

RequestLeaveForm.contextType = LayoutContext;

export default RequestLeaveForm;

const RequestTitle = styled(Title)`
    h2 {
        color: var(--pink);
    }
`;

const RequestInputs = styled(DateInputs)`
    h3 {
        color: var(--pink);
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

