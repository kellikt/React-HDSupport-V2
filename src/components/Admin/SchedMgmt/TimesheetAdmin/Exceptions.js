import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Title } from './AdminFormComponents';
import { ReactComponent as Graphic } from '../../../../images/Admin/Sched/Exceptions.svg';
import Button from '../../../Button';
import TextInput from '../../../TextInput';
import AddException from './AddException';

class Exceptions extends Component {
    constructor(props) {
        super(props);
        const currDate = new Date();

        this.state = {
            date: `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`,
            selectedUser: '',
            searched: false,
        };
    }

    handleClose = () => {
        this.setState({
            searched: false,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            searched: true,
        });
    };

    handleInput = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { date, selectedUser, searched } = this.state;
        const { helpdesk, lab, third_shift } = this.props;

        return (
            <React.Fragment>
                {searched ? (
                    <AddException username={selectedUser} date={date} handleClose={this.handleClose} />
                ) : (
                    <FormEl key="form" {...this.props} onSubmit={this.handleSubmit}>
                        <Graphic />
                        <Content>
                            <Title>
                                <h2>Exceptions Quick Edit</h2>
                                <p>Add/edit a clock-in exception for a single day below:</p>
                            </Title>
                            <Inputs>
                                <div>
                                    <label htmlFor="user">Student</label>
                                    <select
                                        name="selectedUser"
                                        id="user"
                                        onChange={this.handleInput}
                                        value={selectedUser}
                                    >
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
                                    </select>
                                </div>
                                <TextInput
                                    id="date"
                                    value={date}
                                    name="date"
                                    placeholder="mm/dd/yyyy"
                                    onChange={this.handleInput}
                                    label="For this date"
                                />
                            </Inputs>
                            <Button color="green">Next</Button>
                        </Content>
                    </FormEl>
                )}
            </React.Fragment>
        );
    }
}

Exceptions.propTypes = {
    helpdesk: PropTypes.array.isRequired,
    lab: PropTypes.array.isRequired,
    third_shift: PropTypes.array.isRequired,
};

export default Exceptions;

const FormEl = styled.form`
    display: flex;
    margin-top: 90px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    background: var(--white);

    svg {
        max-width: 225px;
        width: 100%;
        height: 100%;
        margin-right: 30px;
        align-self: center;
    }

    .styled-input {
        margin: 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    button {
        margin: 12px 0 0 auto;
    }
`;

const Inputs = styled.div`
    display: flex;
    margin-top: 24px;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 8px;
    }

    > div {
        width: 100%;
        margin-right: 12px;
        display: flex;
        flex-direction: column;
    }
`;
