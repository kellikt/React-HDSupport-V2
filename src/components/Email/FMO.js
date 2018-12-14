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

class FMO extends Component {
    state = {
        summary: '',
        personnel: '',
        badges: '',
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
            const name = axios.get(`/get-name.php?uuid=${uuid}`);
            const username = axios.get(`/get-username.php?uuid=${uuid}`);

            const request = await Promise.all([name, username]);
            const data = [request[0].data, request[1].data];

            this.firstName = data[0].first_name;
            this.username = data[1].username;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const links = [{ title: 'Email Generator', to: '/email' }, { title: 'FMO Access', to: '/email/fmo' }];

        const { bcc, summary, personnel, badges, preview } = this.state;

        return (
            <Container>
                <h1>FMO Access Request</h1>
                <Breadcrumb links={links} color="red" />
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
                        <TextArea>
                            <label htmlFor="summary">Brief Summary of Work</label>
                            <textarea
                                id="summary"
                                placeholder="3rd floor elevator lights"
                                value={summary}
                                onChange={this.handleInput}
                                name="summary"
                            />
                        </TextArea>
                        <TextArea>
                            <label htmlFor="personnel">FMO Personnel Names</label>
                            <textarea
                                id="personnel"
                                placeholder="John Smith and Logan Florenco"
                                value={personnel}
                                onChange={this.handleInput}
                                name="personnel"
                            />
                        </TextArea>
                        <TextInput
                            id="badges"
                            label="FMO Badges Provided"
                            placeholder="12 and 17"
                            value={badges}
                            onChange={this.handleInput}
                            name="badges"
                        />
                    </Text>
                    <Options>
                        <Checkbox
                            id="bcc"
                            label="BCC Self on Email?"
                            name="bcc"
                            checked={bcc}
                            onChange={this.handleInput}
                            color="red"
                        />
                    </Options>
                    <Button color="red">Preview Email</Button>
                </FormEl>
                {preview && (
                    <Preview
                        first={summary}
                        bcc={bcc}
                        second={personnel}
                        from={`${this.username}@hawaii.edu`}
                        third={badges}
                        subject="FMO Access"
                        type="fmo"
                        color="red"
                        firstName={this.firstName}
                    />
                )}
            </Container>
        );
    }
}

FMO.contextType = LayoutContext;
export default FMO;

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
        color: var(--red);
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
            width: 40%;

            @media (max-width: 550px) {
                width: 100%;
            }
        }
    }

    @media (max-width: 550px) {
        grid-template-columns: 1fr;
    }
`;

const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px 0;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        min-height: 150px;
    }
`;
