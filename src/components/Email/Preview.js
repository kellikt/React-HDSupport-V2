import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import TextInput from '../TextInput';
import Button from '../Button';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();

        const { from, first, subject } = this.props;

        first.includes('@') ? (this.toAddress = first) : (this.toAddress = `${first}@hawaii.edu`);

        this.state = {
            from: from,
            to: this.toAddress,
            subject: subject,
            body: '',
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { from, to, subject, body } = this.state;
        const { bcc } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        const request = await axios.get(`/send-email.php`, {
            from: from,
            to: to,
            subject: subject,
            body: body,
            bcc: bcc,
        });
        const data = await request.data;
        console.log(data);
    };

    handleInput = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    async componentDidMount() {
        const { third, second, first, type } = this.props;

        this.ref.current.scrollIntoView({
            behavior: 'smooth',
        });

        const request = await axios.get(`/get-email-contents.php?type=${type}`);
        let data = await request.data;
        data = data.replace(/FIRST/gi, first);
        data = data.replace(/SECOND/gi, second);
        data = data.replace(/THIRD/gi, third);

        this.setState({
            body: data,
        });
    }

    render() {
        const { from, to, subject, body } = this.state;
        const { bcc, color } = this.props;

        return (
            <PreviewForm ref={this.ref} onSubmit={this.handleSubmit}>
                <Title color={color}>
                    <h2>Preview Email</h2>
                    <p>Review the email message below and press 'Send Email' when ready.</p>
                </Title>
                <Text>
                    <TextInput
                        id="from"
                        label="From"
                        placeholder="placeholder@lists.hawaii.edu"
                        value={from}
                        onChange={this.handleInput}
                        name="from"
                    />
                    <TextInput
                        id="to"
                        label="To"
                        placeholder="janed@hawaii.edu"
                        value={to}
                        onChange={this.handleInput}
                        name="to"
                    />
                    <TextInput
                        id="subject"
                        label="Subject"
                        placeholder="Email Subject"
                        value={subject}
                        onChange={this.handleInput}
                        name="subject"
                    />
                </Text>
                <MessageBody>
                    <label htmlFor="body">Email Body</label>
                    <textarea name="body" id="body" onChange={this.handleInput} value={body} />
                </MessageBody>
                {bcc ? (
                    <BCCNotice color="green">You are BCC'd on this email.</BCCNotice>
                ) : (
                    <BCCNotice color="red">You are not BCC'd on this email.</BCCNotice>
                )}
                <Button color={color}>Send Email</Button>
            </PreviewForm>
        );
    }
}

Preview.propTypes = {
    first: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    bcc: PropTypes.bool.isRequired,
    second: PropTypes.string.isRequired,
    third: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Preview;

const PreviewForm = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin: 90px 0 45px;
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
        color: ${({ color }) => (color ? `var(--${color})` : `var(--purple)`)};
    }

    p {
        margin: 0 0 12px;
        line-height: 1.5;
        color: var(--dark-grey);
    }
`;

const MessageBody = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px 0 24px;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        min-height: 200px;
    }
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

const BCCNotice = styled.div`
    max-width: 250px;
    width: 100%;
    margin: 0 0 8px auto;
    font-weight: 600;
    text-align: center;
    color: ${({ color }) => (color ? `var(--${color})` : `var(--green)`)};
`;
