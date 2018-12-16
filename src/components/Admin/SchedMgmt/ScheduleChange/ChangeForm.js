import React, { Component } from 'react';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';
import axios from 'axios';

import { ReactComponent as Graphic } from '../../../../images/Admin/Sched/SchedChange.svg';
import { FormEl, Title, Reasons, DateInputs } from './ChangeFormComponents';
import TextInput from '../../../TextInput';
import RadioButton from '../../../RadioButton';
import Button from '../../../Button';
import SnackbarPortal from '../../../SnackbarPortal';
import Background from '../../../Background';

class ChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            reason: '',
            date: [new Date(), new Date()],
            submitted: false,
            error: false,
            messageHeading: '',
            message: '',
        };
        this.textarea = React.createRef();
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
        });
    };

    handleRadio = event => {
        this.setState({
            reason: event.target.value,
        });
        this.textarea.current.focus();
    };

    handleDate = date => {
        this.setState({ date: date });
    };

    handleSnack = () => {
        this.setState({
            submitted: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { username, reason, date } = this.state;
        const startDateString = `${date[0].getFullYear()}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
        const endDateString = `${date[1].getFullYear()}-${date[1].getMonth() + 1}-${date[1].getDate()}`;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-schedule-change.php`, {
                username: username,
                reason: reason,
                startDate: startDateString,
                endDate: endDateString,
            });
            const data = request.data;

            if (data) {
                this.setState({
                    submitted: true,
                    message: 'Successfully submitted schedule change.',
                    messageHeading: 'Success!',
                    error: false,
                    username: '',
                    reason: '',
                });
            } else {
                this.setState({
                    submitted: true,
                    message: 'Failed to submit schedule change. Check your inputs.',
                    messageHeading: 'Error!',
                    error: true,
                });
            }
            this.timeoutId = setTimeout(() => {
                this.handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    componentWillUnmount() {
        window.clearTimeout(this.timeoutId);
    }

    render() {
        const { username, reason, date, submitted, message, messageHeading, error } = this.state;

        return (
            <FormEl onSubmit={this.handleSubmit}>
                <DateInputs color="purple">
                    <h3>Date Range:</h3>
                    <DateRangerPicker onChange={this.handleDate} value={date} />
                </DateInputs>
                <Graphic />
                <Title>
                    <h2>Enter Schedule Change</h2>
                    <p>Post a notice for:</p>
                    <TextInput
                        placeholder="janed"
                        value={username}
                        onChange={this.handleChange}
                        name="username"
                        id="username"
                        label="UH Username"
                    />
                    <textarea
                        name="reason"
                        ref={this.textarea}
                        value={reason}
                        onChange={this.handleChange}
                        placeholder="Misc. Details"
                    />
                </Title>
                <Reasons>
                    <h4>Reason:</h4>
                    <RadioButton name="radio" id="sick" value="Sick - " label="Sick" onChange={this.handleRadio} />
                    <RadioButton
                        name="radio"
                        id="learly"
                        value="Leaving Early - "
                        label="L. Early"
                        onChange={this.handleRadio}
                    />
                    <RadioButton
                        name="radio"
                        id="late"
                        value="In Late - "
                        label="In Late"
                        onChange={this.handleRadio}
                    />
                    <RadioButton
                        name="radio"
                        id="vacation"
                        value="Vacation"
                        label="Vacation"
                        onChange={this.handleRadio}
                    />
                    <RadioButton name="radio" id="roff" value="R. Off - " label="R. Off" onChange={this.handleRadio} />
                    <RadioButton name="radio" id="other" value="" label="Other" onChange={this.handleRadio} />
                    <Button color="purple">Enter Change</Button>
                </Reasons>
                <SnackbarPortal
                    handler={submitted}
                    message={message}
                    heading={messageHeading}
                    isError={error}
                    onClick={this.handleSnack}
                />
                <Background color="purple" />
            </FormEl>
        );
    }
}

export default ChangeForm;
