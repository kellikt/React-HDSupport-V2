import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Preview from './Preview';

class TrainingLab extends Component {
    state = {
        fullName: '',
        recipient: '',
        requestedDates: '',
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
        try {
            const request = await axios.get(`/get-name.php?uuid=22051104`);
            const data = await request.data;

            this.firstName = data.first_name;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const links = [
            { title: 'Email Generator', to: '/email' },
            { title: 'Training Lab', to: '/email/traininglab' },
        ];

        const { bcc, fullName, recipient, requestedDates, preview } = this.state;

        return (
            <Container>
                <h1>Training Lab Request</h1>
                <Breadcrumb links={links} color="blue" />
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
                            id="fullName"
                            label="Full Name of Requestor"
                            placeholder="Ryan McCalla"
                            value={fullName}
                            onChange={this.handleInput}
                            name="fullName"
                        />
                        <TextInput
                            id="recipient"
                            label="Recipient UH Username for Instructions"
                            placeholder="rmcalla"
                            value={recipient}
                            onChange={this.handleInput}
                            name="recipient"
                        />
                        <TextInput
                            id="requestedDates"
                            label="Requested Dates"
                            placeholder="mm/dd/yyyy - mm/dd/yyyy"
                            value={requestedDates}
                            onChange={this.handleInput}
                            name="requestedDates"
                        />
                    </Text>
                    <Options>
                        <Checkbox
                            id="bcc"
                            label="BCC Self on Email?"
                            name="bcc"
                            checked={bcc}
                            onChange={this.handleInput}
                            color="blue"
                        />
                    </Options>
                    <Button color="blue">Preview Email</Button>
                </FormEl>
                {preview && (
                    <Preview
                        first={recipient}
                        bcc={bcc}
                        second={fullName}
                        from="itstraininglab-l@hawaii.edu"
                        third={requestedDates}
                        subject="Re: UH ITS Computer Training Lab Reservation"
                        type="traininglab"
                        color="blue"
                        firstName={this.firstName}
                    />
                )}
            </Container>
        );
    }
}

export default TrainingLab;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;

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
        color: var(--blue);
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
        }
    }
`;
