import React, { Component } from 'react';

import ErrorSnackbar from './ErrorSnackbar';
import { PoseGroup } from 'react-pose';
import { FormEl, Title, UHSearch, PIISearch } from './FormComponents';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { ReactComponent as GradHat } from '../../../images/Admin/Acct/GradHat.svg';
import { ReactComponent as Forms } from '../../../images/Admin/Acct/Forms.svg';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            uuid: '',
            firstName: '',
            lastName: '',
            error: false,
        };
    }

    handleSnack = () => {
        this.setState({
            error: false,
        });
    };

    handleChange = (event, type) => {
        switch (type) {
            case 'username':
                this.setState({
                    username: event.target.value,
                });
                break;
            case 'uuid':
                this.setState({
                    uuid: event.target.value,
                });
                break;
            case 'firstName':
                this.setState({
                    firstName: event.target.value,
                });
                break;
            case 'lastName':
                this.setState({
                    lastName: event.target.value,
                });
                break;
            default:
                break;
        }
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { username, uuid, firstName, lastName } = this.state;

        if (username === '' && uuid === '' && firstName === '' && lastName === '') {
            this.setState({
                error: true,
            });
            setTimeout(() => {
                this.handleSnack();
            }, 3000);
        }
    };

    render() {
        const { username, uuid, firstName, lastName, error } = this.state;

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Title>
                        <h1>User Lookup</h1>
                        <p>Use one of the following methods to search for a user.</p>
                    </Title>
                    <UHSearch>
                        <h2>UH Search Criteria:</h2>
                        <GradHat />
                        <TextInput
                            id="UHUsername"
                            label="UH Username"
                            placeholder="janed"
                            value={username}
                            onChange={event => this.handleChange(event, 'username')}
                        />
                        <TextInput
                            id="UHnumber"
                            label="UH Number"
                            placeholder="12345678"
                            value={uuid}
                            onChange={event => this.handleChange(event, 'uuid')}
                        />
                    </UHSearch>
                    <PIISearch>
                        <h2>Personal Info Criteria:</h2>
                        <Forms />
                        <TextInput
                            id="firstname"
                            label="First Name"
                            placeholder="Jane"
                            value={firstName}
                            onChange={event => this.handleChange(event, 'firstName')}
                        />
                        <TextInput
                            id="lastname"
                            label="Last Name"
                            placeholder="Doe"
                            value={lastName}
                            onChange={event => this.handleChange(event, 'lastName')}
                        />
                    </PIISearch>
                    <Button color="purple">Search</Button>
                </FormEl>
                <ErrorSnackbar
                    error={error}
                    errMessage="Enter at least a single search term."
                    onClick={this.handleSnack}
                />
            </React.Fragment>
        );
    }
}

export default Form;
