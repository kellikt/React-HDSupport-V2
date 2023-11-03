import React, { useState } from 'react';
import axios, { formToJSON } from 'axios';
import styled from '@emotion/styled';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';

import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import Button from '../Button';
import SnackbarPortal from '../SnackbarPortal';

function AddGoogleTemplate() {
    const [state, setState] = useState({
        template: '',
        subject: '',
        from: '',
        to: '',
        content: '',
        submitted: false,
    });

    const [snack, setSnack] = useState({
        handler: false,
        heading: '',
        message: '',
        isError: false,
    });

    const links = [{ title: 'Google Storage', to: '/google-storage' }, { title: 'Add Template', to: '/add-google-template' }];

    const textarea = React.createRef();

    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        setState({
            ...state,
            [name]: value,
        });
    }

    const handleSnack = () => {
        setState({
            ...state,
            handler: false,
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-google-template.php`, {
                tname: state.template,
                fromAddress: state.from,
                subject: state.subject,
                content: state.content,
            });

            const tid = await request.data;
            console.log(tid);
            setSnack({
                ...snack,
                handler: true,
            });
            setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <h1>Add Google Storage Template</h1>
            <Breadcrumb links={links} color="purple" />
            <AddForm onSubmit={handleSubmit}>
                <Title>
                    <h2>Add Google Storage Template</h2>
                    <p>Create a new Google Storage Template.</p>
                </Title>
                <TextInput 
                    id="template"
                    label="Template Name"
                    placeholder="Template Name"
                    onChange={handleChange}
                    name="template"
                />
                <TextInput 
                    id="subject"
                    label="Subject"
                    placeholder="Subject"
                    onChange={handleChange}
                    name="subject"
                />
                <TextInput 
                    id="from"
                    label="Email Sender (From:)"
                    placeholder="Email Sender"
                    onChange={handleChange}
                    name="from"
                />
                <textarea 
                    name="content"
                    ref={textarea}
                    onChange={handleChange}
                    placeholder="Email Content"
                />
                <Button color="purple">Create Template</Button>
                <SnackbarPortal 
                    handler={snack.handler}
                    message={`You have created the ${state.template} Template`}
                    heading="Success!"
                    onClick={handleSnack}
                />
            </AddForm>
        </Container>
    );
}

export default AddGoogleTemplate;

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
