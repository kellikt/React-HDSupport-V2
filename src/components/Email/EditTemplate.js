import { useEffect, useState } from 'react';
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

function EditTemplate() {

    const { tid } = useParams();

    const [form, setForm] = useState({
        template: '',
        subject: '',
        from: '',
        to: '',
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
        });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-email-template.php`, {
                tname: form.template,
                toAddress: form.to,
                fromAddress: form.from,
                subject: form.subject,
                content: form.content,
                tid: tid,
            });
            setSnack(true);
            const timerId = setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch(error) {
            console.log(error);
        }
    };

    const handleSnack = () => {
        setSnack(false);
    };

    useEffect(() => {
        const fetchData = async() => {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-email-templates.php?tid=${tid}`);
            const data = request.data;
            let stateObj = {
                template: data[0].tname,
                subject: data[0].subject,
                from: data[0].from_address,
                to: data[0].to_address,
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
    }, []); 

    const links = [{ title: 'HD Training Templates', to: '/hd-training'}, { title: `Edit ${form.template} Template`, to: `/edit-template/${tid}` }];

    return (
        <Container>
            <h1>Edit Training Template</h1>
            <Breadcrumb links={links} color="light-blue" />
            <EditForm onSubmit={handleSubmit}>
                <Title>
                    <h2>Edit {form.template} Template</h2>
                    <p>Make modifications to the {form.template} template</p>
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
                <TextInput 
                    id="to"
                    label="Email Recipient (To:)"
                    placeholder="Email Recipient"
                    onChange={handleChange}
                    value={form.to}
                    name="to"
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

};

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