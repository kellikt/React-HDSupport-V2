import React, { Component } from 'react';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, DateRange, Options, Main, Radios } from './DisplayChangesComponents';
import { ReactComponent as Graphic } from '../../../images/Admin/Sched/DisplaySched.svg';
import TextInput from '../../TextInput';
import Button from '../../Button';
import RadioButton from '../../RadioButton';
import DisplayChangesTable from './DisplayChangesTable';

class DisplayChangesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [new Date(), new Date()],
            username: '',
            radio: '',
            submitted: false,
        };
    }

    handleInput = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
            submitted: false,
        });
    };

    handleDate = date => {
        this.setState({ date: date, submitted: false });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ submitted: true });
    };

    render() {
        const { date, username, submitted, radio } = this.state;

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <DateRange color="gold">
                        <h3>Date Range:</h3>
                        <DateRangerPicker onChange={this.handleDate} value={date} />
                    </DateRange>
                    <Graphic />
                    <Main>
                        <Title>
                            <h2>Display Schedule Changes</h2>
                            <p>Show a list of all schedule changes for a specified user and date range:</p>
                        </Title>
                        <TextInput
                            id="username"
                            label="UH Username"
                            placeholder="janed"
                            value={username}
                            onChange={this.handleInput}
                            name="username"
                        />
                    </Main>
                    <Options>
                        <h4>Only View:</h4>
                        <Radios>
                            <RadioButton
                                name="radio"
                                id="staff"
                                value="Students"
                                label="Students"
                                onChange={this.handleInput}
                            />
                            <RadioButton
                                name="radio"
                                id="students"
                                value="Staff"
                                label="Staff"
                                onChange={this.handleInput}
                            />
                        </Radios>
                        <Button color="gold">Display Changes</Button>
                    </Options>
                </FormEl>
                {submitted && (
                    <DisplayChangesTable key="table" username={username} date={date} option={radio} />
                )}
            </React.Fragment>
        );
    }
}

export default DisplayChangesForm;
