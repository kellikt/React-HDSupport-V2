import React, { Component } from 'react';
import axios from 'axios';

import { Form, Title, CurrentHolidays, Inputs, Text } from './HolidayWizardComponents';
import Button from '../../../Button';
import TextInput from '../../../TextInput';
import SnackbarPortal from '../../../SnackbarPortal';
import HolidayList from './HolidayList';

class HolidayWizard extends Component {
    constructor(props) {
        super(props);
        const currDate = new Date();
        this.state = {
            holiday: '',
            date: `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`,
            holidayList: [],
            full: false,
            snack: false,
            message: '',
            heading: '',
            error: false,
        };
    }

    handleSnack = () => {
        this.setState({
            snack: false,
        });
    };

    handleError = message => {
        this.setState({
            error: true,
            snack: true,
            message: message,
            heading: 'Error!',
        });
    };

    handleChange = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { date, holiday, full } = this.state;

        const dateObj = new Date(Date.parse(date));
        const timestamp = dateObj.getTime() / 1000;

        if (timestamp < 0 || isNaN(timestamp) || holiday === '') {
            this.handleError('Invalid inputs. Check the name or date.');
        } else {
            try {
                await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-holiday.php`, {
                    description: holiday,
                    timestamp: timestamp,
                });

                if (full) {
                    this.getHolidays('yes');
                } else {
                    this.getHolidays('no');
                }

                this.setState({
                    holiday: '',
                    date: '',
                    snack: true,
                    message: `Added "${holiday}" to the holiday list.`,
                    heading: 'Success!',
                });
                this.timerId = setTimeout(() => {
                    this.handleSnack();
                }, 3000);
            } catch (error) {
                this.handleError('Something went wrong with the database.');
            }
        }
    };

    getHolidays = async full => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-holidays.php?full=${full}`);
            const data = request.data;

            if (full === 'no') {
                this.setState({
                    holidayList: data,
                    full: false,
                });
            } else {
                this.setState({
                    holidayList: data,
                    full: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async stamp => {
        const { full } = this.state;

        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-holiday.php`, {
                timestamp: stamp,
            });

            if (full) {
                this.getHolidays('yes');
            } else {
                this.getHolidays('no');
            }
        } catch (error) {
            this.handleError('Something went wrong with the database.');
        }
    };

    componentDidMount() {
        this.getHolidays('no');
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const { holiday, date, holidayList, full, message, heading, error, snack } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <CurrentHolidays>
                    <Title>
                        <h2>Holiday List Wizard</h2>
                        <p>Remove any Holidays below:</p>
                    </Title>
                    <HolidayList
                        holidayList={holidayList}
                        handleDelete={this.handleDelete}
                        full={full}
                        getHolidays={this.getHolidays}
                        heading="Holidays"
                        color="blue"
                    />
                </CurrentHolidays>
                <Inputs>
                    <Title>
                        <h2>Add A Holiday</h2>
                        <p>Add a holiday below:</p>
                    </Title>
                    <Text>
                        <TextInput
                            id="holiday"
                            name="holiday"
                            value={holiday}
                            label="Holiday Name"
                            onChange={this.handleChange}
                            placeholder="Thanksgiving"
                        />
                        <TextInput
                            id="date"
                            name="date"
                            value={date}
                            label="Date"
                            onChange={this.handleChange}
                            placeholder="12/25/2018"
                        />
                    </Text>
                    <Button color="blue">Add Holiday</Button>
                </Inputs>
                <SnackbarPortal
                    handler={snack}
                    message={message}
                    heading={heading}
                    onClick={this.handleSnack}
                    isError={error}
                />
            </Form>
        );
    }
}

export default HolidayWizard;
