import React, { Component } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';

import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import Button from '../Button';
import SnackbarPortal from '../SnackbarPortal';

class AddTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template: '',
            subject: '',
            from: '',
            to: '',
            content: '',
            submitted: false,
            snackHandler: false,
        }
        this.textarea = React.createRef();
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSnack = () => {
        this.setState({
            snackHandler: false,
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { template, subject, from, to, content } = this.state;

        try {
            console.log(template);
            console.log(subject);
            console.log(from);
            console.log(to);
            console.log(content);
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-email-template.php`, {
                tname: template,
                fromAddress: from,
                toAddress: to,
                subject: subject,
                content: content,
            });

            const tid = await request.data;
            console.log(tid);
            this.setState({
                snackHandler: true,
            });
            this.timerId = setTimeout(() => {
                this.handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const links = [{ title: 'Google Storage Templates', to: '/google-storage' }, { title: 'Add Template', to: '/add-template' }];

        const { snackHandler } = this.state;
        const { template } = this.state;

        return (
            <Container>
                <h1>Add Training Template</h1>
                <Breadcrumb links={links} color="purple" />
                <AddForm onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>Add Training Template</h2>
                        <p>Create a new training template to send to the test environment.</p>
                    </Title>
                    <TextInput 
                        id="template"
                        label="Template Name"
                        placeholder="Template Name"
                        onChange={this.handleChange}
                        name="template"
                    />
                    <TextInput 
                        id="subject"
                        label="Subject"
                        placeholder="Subject"
                        onChange={this.handleChange}
                        name="subject"
                    />
                    <TextInput 
                        id="from"
                        label="Email Sender (From:)"
                        placeholder="Email Sender"
                        onChange={this.handleChange}
                        name="from"
                    />
                    <TextInput 
                        id="to"
                        label="Email Recipient (To:)"
                        placeholder="Email Recipient"
                        onChange={this.handleChange}
                        name="to"
                    />
                    <textarea
                        name="content"
                        ref={this.textarea}
                        onChange={this.handleChange}
                        placeholder="Email Content" 
                    />
                    <Button color="purple">Create Template</Button>
                    <SnackbarPortal 
                        handler={snackHandler}
                        message={`You have created the ${template} Template`}
                        heading="Success!"
                        onClick={this.handleSnack}
                    />
                </AddForm>
            </Container>
        );
    }
}

export default AddTemplate;

const AddForm = styled(FormEl)`
    grid-template-columns: repeat(4, 1fr);
    textarea {
        grid-column: 1/-1;
    }
    button {
        grid-column: 4;
        @media (max-width: 910px) {
            grid-column: 1;
        }
    }
    @media (max-width: 910px) {
        grid-template-columns: 1fr;
    }
`;