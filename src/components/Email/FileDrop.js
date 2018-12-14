import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Preview from './Preview';
import { LayoutContext } from '../../LayoutContext';

class FileDrop extends Component {
    state = {
        current: '',
        recipient: '',
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

    async componentDidMount() {
        let value = this.context;
        const { uuid } = value;

        try {
            const request = await axios.get(`/get-name.php?uuid=${uuid}`);
            const data = request.data;

            this.firstName = data.first_name;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const links = [{ title: 'Email Generator', to: '/email' }, { title: 'Filedrop', to: '/email/filedrop' }];

        const { bcc, current, recipient, simpTicket, preview } = this.state;

        return (
            <Container>
                <h1>Filedrop Instructions</h1>
                <Breadcrumb links={links} color="purple" />
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
                            placeholder="janed"
                            value={current}
                            onChange={this.handleInput}
                            name="current"
                        />
                        <TextInput
                            id="recipient"
                            label="Recipient Personal Email for Instructions"
                            placeholder="placeholder@gmail.com"
                            value={recipient}
                            onChange={this.handleInput}
                            name="recipient"
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
                            color="purple"
                        />
                    </Options>
                    <Button color="purple">Preview Email</Button>
                </FormEl>
                {preview && (
                    <Preview
                        first={recipient}
                        bcc={bcc}
                        second={current}
                        from="help@hawaii.edu"
                        third={simpTicket}
                        subject="Filedrop Instructions for UH Password Reset"
                        type="filedrop"
                        color="purple"
                        firstName={this.firstName}
                    />
                )}
            </Container>
        );
    }
}

FileDrop.contextType = LayoutContext;
export default FileDrop;

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
        color: var(--purple);
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
