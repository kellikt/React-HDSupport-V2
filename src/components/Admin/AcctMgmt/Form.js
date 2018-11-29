import React, { Component } from 'react';
import axios from 'axios';

import Snackbar from '../Snackbar';
import { FormEl, Title, UHSearch, PIISearch } from './FormComponents';
import TextInput from '../../TextInput';
import Button from '../../Button';
import SearchResult from './SearchResult';
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
            searched: false,
            searchResult: {},
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
            this.timeoutID = setTimeout(() => {
                this.handleSnack();
            }, 3000);
        } else {
            this.setState({
                searching: true,
            });
            try {
                const request = await axios.post('/search-user.php', {
                    username: username,
                    uuid: uuid,
                    firstName: firstName,
                    lastName: lastName,
                });
                const data = await request.data;

                this.setState({
                    searchResult: data,
                    searched: true,
                    searching: false,
                });
            } catch (error) {
                console.log(`Error searching for user: ${error}`);
            }
        }
    };

    componentWillUnmount() {
        window.clearTimeout(this.timeoutID);
    }

    render() {
        const { username, uuid, firstName, lastName, error, searched, searchResult } = this.state;

        return (
            <React.Fragment>
                {searched ? (
                    <SearchResult result={searchResult} />
                ) : (
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
                )}
                <Snackbar
                    handler={error}
                    message="Enter at least a single search term."
                    onClick={this.handleSnack}
                    heading="Error!"
                    isError={true}
                />
            </React.Fragment>
        );
    }
}

export default Form;
