import React, { Component } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import Button from '../../Button';
import TextInput from '../../TextInput';
import { FormEl, Title } from './BadgeFormComponents';
import SnackbarPortal from '../../SnackbarPortal';
import { Inputs } from '../../Admin/SchedMgmt/ClockMetrics/MetricsFormComponents';
import { ReactComponent as Graphic } from '../../../images/Admin/Badges/AddStudentBadgeIndex.svg';
import Background from '../../Background';

class BadgeForm extends Component {
    state = {
        selectedUser: '',
        helpdesk: [],
        lab: [],
        third_shift: [],
        leapstart: [],
        badges: [],
        selectedBadge: '',
        notes: '',
        snack: false,
        error: false,
        message: '',
        heading: '',
        searched: false,
    };

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
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            searched: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const { selectedUser, selectedBadge, notes } = this.state;
        
        try {
            axios.post(`${process.env.REACT_APP_DB_SERVER}/add-student-badge.php`, {
                username: selectedUser,
                bid: selectedBadge,
                notes: notes
            });
        } catch (error) {
            console.log(`Error adding badge: ${error}`);
        }
        this.setState({
            snack: true,
            message: `Successfully added badge for ${selectedUser}`,
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.timeoutID = setTimeout(() => {
            this.handleSnack();
        }, 3000);
    }

    async componentDidMount() {
        try {
            const helpdesk = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=helpdesk`);
            const lab = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=lab`);
            const third_shift = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=third_shift`);
            const leapstart = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=leapstart`);
            const badges = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badges.php`, {
                name: ''
            });

            const data = await Promise.all([helpdesk, lab, third_shift, leapstart, badges]);

            this.setState({
                helpdesk: data[0].data,
                lab: data[1].data,
                third_shift: data[2].data,
                leapstart: data[3].data,
                badges: data[4].data
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { helpdesk, lab, third_shift, leapstart, selectedUser, badges, selectedBadge, notes, message, heading, error, snack } = this.state;

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <BadgeGraphic />
                    <Title>
                        <h2>Add Badge</h2>
                        <p>Add a badge for:</p>
                    </Title>
                    <Inputs>
                        <div>
                            <label htmlFor="user">Student</label>
                            <select name="selectedUser" id="user" onChange={this.handleChange} value={selectedUser}>
                                <option value="None">Select a Student</option>
                                <optgroup label="Help Desk">
                                    {helpdesk.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                                <optgroup label="Lab Monitors">
                                    {lab.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                                <optgroup label="Third Shift">
                                    {third_shift.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                                <optgroup label="Leap Start">
                                    {leapstart.map(student => {
                                        return (
                                            <option value={student.username} key={student.uid}>{`${
                                                student.last_name
                                            }, ${student.first_name}`}</option>
                                        );
                                    })}
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="badges">Badge</label>
                            <select name="selectedBadge" id="badges" onChange={this.handleChange} value={selectedBadge}>
                                <option value="None">Select Badge</option>
                                {badges.map((badge, index) => {
                                    return (
                                        <option value={badge.bid} key={index}>
                                            {badge.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <TextInput
                            id="notes"
                            name="notes"
                            value={notes}
                            label="Badge Notes"
                            onChange={this.handleChange}
                            placeholder="Enter Notes"
                        />
                    </Inputs>
                    <Button color="light-blue" onSubmit={this.handleSubmit}>Add Badge</Button>
                    <SnackbarPortal
                    handler={snack}
                    message={message}
                    heading={heading}
                    onClick={this.handleSnack}
                    isError={error}
                    />
                </FormEl>
                <Background color="blue" yOffset={90} />
            </React.Fragment>
        );
    }
}

export default BadgeForm;

const BadgeGraphic = styled(Graphic)`
    width: 251px;
    top: -36px !important;
    left: 38px !important;
`;