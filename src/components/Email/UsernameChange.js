import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Preview from './Preview';
import Background from '../Background';

class UsernameChange extends Component {
    state = {
        current: '',
        newUsername: '',
        simpTicket: '',
        bcc: true,
        preview: false,
    };

    handleInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            preview: false,
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            preview: true,
        });
    };

    render() {
        const links = [
            { title: 'Email Generator', to: '/email' },
            { title: 'UH Username Change', to: '/email/usernamechange' },
        ];

        const { bcc, current, newUsername, simpTicket, preview } = this.state;

        return (
            <Container>
                <h1>UH Username Change</h1>
                <Breadcrumb links={links} color="gold" />
                <FormEl onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>Email Fields</h2>
                        <p>
                            Specify the appropriate info to fill the email template.
                            <br />
                            You can preview the full email before sending.
                        </p>
                    </Title>
                    <Text>
                        <TextInput
                            id="current"
                            label="Current UH Username of Requestor"
                            placeholder="Current Username"
                            value={current}
                            onChange={this.handleInput}
                            name="current"
                        />
                        <TextInput
                            id="newUsername"
                            label="New UH Username Requested"
                            placeholder="New Username"
                            value={newUsername}
                            onChange={this.handleInput}
                            name="newUsername"
                        />
                        <TextInput
                            id="simpTicket"
                            label="SIMP Ticket Number"
                            placeholder="123456"
                            value={simpTicket}
                            onChange={this.handleInput}
                            name="simpTicket"
                        />
                    </Text>
                    <Options>
                        <Checkbox
                            id="bcc"
                            label="BCC Self on Email?"
                            name="bcc"
                            checked={bcc}
                            onChange={this.handleInput}
                            color="gold"
                        />
                    </Options>
                    <Button color="gold">Preview Email</Button>
                </FormEl>
                {preview && (
                    <Preview
                        first={current}
                        bcc={bcc}
                        second={newUsername}
                        from="help@hawaii.edu"
                        third={simpTicket}
                        subject={`Confirmation of UH Username Change Request (SIMP #${simpTicket})`}
                        type="usernamechange"
                        color="gold"
                    />
                )}
                <Background color="gold" />
            </Container>
        );
    }
}

export default UsernameChange;

const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    > button {
        margin-left: auto;
        max-width: 250px;
        width: 100%;
    }
`;

const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--gold);
    }

    p {
        margin: 0 0 12px;
        line-height: 1.5;
        color: var(--dark-grey);
    }
`;

const Options = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 0;
    width: 100%;
`;

const Text = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;

    > div {
        &:last-of-type {
            grid-column: 1/-1;
            width: 60%;

            @media (max-width: 550px) {
                width: 100%;
            }
        }
    }

    @media (max-width: 550px) {
        grid-template-columns: 1fr;
    }
`;
