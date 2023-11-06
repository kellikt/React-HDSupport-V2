import React, { Component } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { FormEl, Title, Options, Main } from './ManageBadgesComponents';
import { ReactComponent as Graphic } from '../../../images/Admin/Badges/EditStudentBadgeIndex.svg';
import { Inputs } from '../../Admin/SchedMgmt/ClockMetrics/MetricsFormComponents';
import TextInput from '../../TextInput';
import Button from '../../Button';
import ManageBadgesTable from './ManageBadgesTable';

class ManageBadgesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badge: '',
            selectedUser: '',
            helpdesk: [],
            lab: [],
            third_shift: [],
            leapstart: [],
            submitted: false,
        };
    }

    handleInput = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
            submitted: false,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
    };

    async componentDidMount() {
        try {
            const helpdesk = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=helpdesk`);
            const lab = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=lab`);
            const third_shift = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=third_shift`);
            const leapstart = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=leapstart`);

            const data = await Promise.all([helpdesk, lab, third_shift, leapstart]);

            this.setState({
                helpdesk: data[0].data,
                lab: data[1].data,
                third_shift: data[2].data,
                leapstart: data[3].data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { helpdesk, lab, third_shift, leapstart, selectedUser, badge, submitted } = this.state;

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Graphic />
                    <Main>
                        <Title>
                            <h2>Manage Student Badges</h2>
                            <p>
                                Shows a list of badges for specified user and badge. Omitting the 'Badge' field will
                                fetch all badges for the student.
                            </p>
                        </Title>
                        <Inputs>
                            <div>
                                <label htmlFor="user">Student</label>
                                <select name="selectedUser" id="user" onChange={this.handleInput} value={selectedUser}>
                                    <option value="None">Select a Student</option>
                                    <optgroup label="Help Desk">
                                        {helpdesk.map((student) => {
                                            return (
                                                <option
                                                    value={student.username}
                                                    key={student.uid}
                                                >{`${student.last_name}, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Lab Monitors">
                                        {lab.map((student) => {
                                            return (
                                                <option
                                                    value={student.username}
                                                    key={student.uid}
                                                >{`${student.last_name}, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Third Shift">
                                        {third_shift.map((student) => {
                                            return (
                                                <option
                                                    value={student.username}
                                                    key={student.uid}
                                                >{`${student.last_name}, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Leap Start">
                                        {leapstart.map((student) => {
                                            return (
                                                <option
                                                    value={student.username}
                                                    key={student.uid}
                                                >{`${student.last_name}, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                </select>
                            </div>
                            <TextInput
                                id="badge"
                                label="Badge Name"
                                placeholder="7AM Samurai"
                                value={badge}
                                onChange={this.handleInput}
                                name="badge"
                            />
                        </Inputs>
                        <Options>
                            <Button color="dark-blue">Display Badges</Button>
                        </Options>
                    </Main>
                </FormEl>
                <AnimatePresence>
                    {submitted && (
                        <ManageBadgesTable
                            key="table"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 0.3,
                                delay: 3,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            user={selectedUser}
                            badge={badge}
                        />
                    )}
                </AnimatePresence>
            </React.Fragment>
        );
    }
}

export default ManageBadgesForm;
