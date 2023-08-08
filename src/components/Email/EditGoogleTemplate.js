import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import {
    useParams
} from 'react-router-dom';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';

import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import Button from '../Button';
import SnackbarPortal from '../SnackbarPortal';

function EditGoogleTemplate() {

    const { gtid } = useParams();

    const [form, setForm] = useState({
        template: '',
        subject: '',
        from: '',
        content: '',
        submitted: false,
        snackHandler: false,
    });

    const [snack, setSnack] = useState(false);

    const textarea = React.createRef();

    const handleChange = event => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-google-template.php`, {
                tname: form.template,
                fromAddress: form.from,
                subject: form.subject,
                content: form.content,
                gtid: gtid,
            });
            setSnack(true);
            const timerId = setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSnack = () => {
        setSnack(false);
    }

    useEffect(() => {
        const fetchData = async() => {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-google-templates.php?gtid=${gtid}`);
            const data = request.data;
            console.log(data);
            let stateObj = {
                template: data[0].tname,
                subject: data[0].subject,
                from: data[0].from_address,
                content: data[0].content,
                submitted: false,
                snackHandler: false,
            }

            setForm(stateObj);
        }

        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const links = [{ title: 'Google Storage Templates', to: '/google-storage'}, {title: `Edit ${form.template} Template`, to: `/edit-template/${gtid}`}];

    return (
        <Container>
            <h1>Edit Google Storage Template</h1>
            <Breadcrumb links={links} color="light-blue" />
            <EditForm onSubmit={handleSubmit}>
                <Title>
                    <h2>Edit {form.template} Template</h2>
                    <p>Edit an existing Google Storage template.</p>
                </Title>
                <TextInput 
                    id="template"
                    label="Template Name"
                    placeholder="Template Name"
                    onChange={handleChange}
                    value={form.template}
                    name="template"
                />
                <TextInput 
                    id="subject"
                    label="Subject"
                    placeholder="Subject"
                    onChange={handleChange}
                    value={form.subject}
                    name="subject"
                />
                <TextInput 
                    id="from"
                    label="Email Sender (From:)"
                    placeholder="Email Sender"
                    onChange={handleChange}
                    value={form.from}
                    name="from"
                />
                <textarea 
                    name="content"
                    ref={textarea}
                    onChange={handleChange}
                    value={form.content}
                    placeholder="Email Content"
                />
                <Button color="light-blue">Save Changes</Button>
                <SnackbarPortal 
                    handler={snack}
                    message={`You have updated the ${form.template} template`}
                    heading="Success!"
                    onClick={handleSnack}
                />
            </EditForm>
        </Container>
    );
}

export default EditGoogleTemplate;

const EditForm = styled(FormEl)`
    grid-template-columns: repeat(3, 1fr);
    textarea {
        grid-column: 1/-1;
    }
    button {
        grid-column: 3;
        @media (max-width: 910px) {
            grid-column: 1;
        }
    }

    @media (max-width: 910px) {
        grid-template-columns: 1fr;
    }
`;
