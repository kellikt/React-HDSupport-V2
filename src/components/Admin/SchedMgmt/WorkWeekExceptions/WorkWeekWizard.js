import React, { Component } from 'react';
import axios from 'axios';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';

import { Form, Inputs, Text } from '../HolidayWizard/HolidayWizardComponents';
import { Title, CurrentWeeks, RangeInput } from './WorkWeekComponents';
import HolidayList from '../HolidayWizard/HolidayList';
import TextInput from '../../../TextInput';
import Button from '../../../Button';

class WorkWeekWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekList: [],
            full: false,
            week: '',
            date: [new Date(), new Date()],
        };
    }

    handleChange = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    handleError = message => {
        alert(message);
    };

    handleDelete = async stamp => {
        const { full } = this.state;

        try {
            await axios.post(`/delete-work-week.php`, {
                timestamp: stamp,
            });

            if (full) {
                this.getWeeks('yes');
            } else {
                this.getWeeks('no');
            }
        } catch (error) {
            this.handleError('Something went wrong with the database.');
        }
    };

    handleDate = date => {
        this.setState({ date: date });
    };

    addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);

        return result;
    };

    subtractDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);

        return result;
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { date, week } = this.state;

        if (week === '') {
            this.handleError('Invalid inputs. Check the name or date.');
        } else {
            const beginGap = date[0].getDay(); // days between selected day of week and previous Sunday
            const endGap = 6 - date[1].getDay(); // days between selected day of week and next Saturday
            const beginDate = this.subtractDays(date[0], beginGap);
            const endDate = this.addDays(date[1], endGap);
            const timeDiff = Math.abs(endDate.getTime() - beginDate.getTime() + 1);
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const weeksToAdd = diffDays / 7;

            console.log(weeksToAdd);
        }
    };

    getWeeks = async full => {
        try {
            const request = await axios.get(`/get-work-weeks.php?full=${full}`);
            const data = request.data;

            if (full === 'no') {
                this.setState({
                    weekList: data,
                    full: false,
                });
            } else {
                this.setState({
                    weekList: data,
                    full: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getWeeks('no');
    }

    render() {
        const { full, weekList, date, week } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <CurrentWeeks>
                    <Title>
                        <h2>Work Week Wizard</h2>
                        <p>Remove any work-weeks below:</p>
                    </Title>
                    <HolidayList
                        holidayList={weekList}
                        handleDelete={this.handleDelete}
                        full={full}
                        getHolidays={this.getWeeks}
                        heading="40 Hour Work Weeks"
                        color="red"
                        week
                    />
                </CurrentWeeks>
                <Inputs>
                    <Title>
                        <h2>Add A Holiday</h2>
                        <p>Add a holiday below:</p>
                    </Title>
                    <Text>
                        <TextInput
                            id="week"
                            name="week"
                            value={week}
                            label="Week Name"
                            onChange={this.handleChange}
                            placeholder="Summer 2019"
                        />
                        <RangeInput color="red">
                            <label>Date Range</label>
                            <DateRangerPicker onChange={this.handleDate} value={date} />
                        </RangeInput>
                    </Text>
                    <Button color="red">Add 40 Hour Week</Button>
                </Inputs>
            </Form>
        );
    }
}

export default WorkWeekWizard;
