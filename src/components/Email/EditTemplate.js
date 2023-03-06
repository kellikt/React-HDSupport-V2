import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';

import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import Button from '../Button';
import SnackbarPortal from '../SnackbarPortal';

class EditTemplate extends Component {
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
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { tid } = this.props;

        const { template, subject, from, to, content } = this.state;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-email-template.php`, {
                tname: template,
                toAddress: to,
                fromAddress: from,
                subject: subject,
                content: content,
                tid: tid,
            });
            this.setState({
                snackHandler: true,
            });
            this.timerId = setTimeout(() => {
                this.handleSnack();
            }, 3000);
            console.log(request.data);
        } catch(error) {
            console.log(error);
        }
    }

    handleSnack = () => {
        this.setState({
            snackHandler: false,
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    async componentDidMount() {
        const { tid } = this.props;
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-email-templates.php?tid=${tid}`);
            const data = request.data;
            this.setState({
                template: data[0].tname,
                subject: data[0].subject,
                from: data[0].from_address,
                to: data[0].to_address,
                content: data[0].content,
            });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { tid } = this.props;
        const { snackHandler, template, subject, from, to, content } = this.state;
        const links = [{ title: 'HD Training Templates', to: '/hd-training'}, { title: `Edit ${template} Template`, to: `/edit-template/${tid}` }];

        return (
            <Container>
                <h1>Edit Training Template</h1>
                <Breadcrumb links={links} color="light-blue" />
                <EditForm onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>Edit {template} Template</h2>
                        <p>Make modifications to the {template} template</p>
                    </Title>
                    <TextInput
                        id="template"
                        label="Template Name"
                        placeholder="Template Name"
                        onChange={this.handleChange}
                        value={template}
                        name="template"
                    />
                    <TextInput
                        id="subject"
                        label="Subject"
                        placeholder="Subject"
                        onChange={this.handleChange}
                        value={subject}
                        name="subject"
                    />
                    <TextInput
                        id="from"
                        label="Email Sender (From:)"
                        placeholder="Email Sender"
                        onChange={this.handleChange}
                        value={from}
                        name="from"
                    />
                    <TextInput 
                        id="to"
                        label="Email Recipient (To:)"
                        placeholder="Email Recipient"
                        onChange={this.handleChange}
                        value={to}
                        name="to"
                    />
                    <textarea
                        name="content"
                        ref={this.textarea}
                        onChange={this.handleChange}
                        value={content}
                        placeholder="Email Content"
                    />
                    <Button color="light-blue">Save Changes</Button>
                    <SnackbarPortal 
                        handler={snackHandler}
                        message={`You have updated the ${template} template`}
                        heading="Success!"
                        onClick={this.handleSnack}
                    />
                </EditForm>
            </Container>
        );
    }
}

export default EditTemplate;

const EditForm = styled(FormEl)`
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