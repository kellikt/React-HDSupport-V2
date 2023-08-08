import React, { useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import RadioButton from '../RadioButton';
import { Radios } from '../Admin/SchedMgmt/DisplaySchedule/DisplayChangesComponents';
import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import { Text } from '../Admin/SchedMgmt/HolidayWizard/HolidayWizardComponents';
import { ReactComponent as HDVector } from '../../images/Email/HDTraining.svg';
import SnackbarPortal from '../SnackbarPortal';
import { ReactComponent as EditIcon } from '../../images/icons/Email/Edit.svg';
import { ReactComponent as Trash } from '../../images/icons/Email/Trash.svg';

function GoogleStorageTemplate() {
    const [state, setState] = useState({
        student: '',
        templates: [],
        selectedTemplates: [],
        links: [{ title: 'Google Storage Templates', to: '/google-storage' }]
    });

    const [snack, setSnack] = useState({
        handler: false,
        heading: '',
        message: '',
        radio: '',
        isError: false,
    });

    const handleInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target.type);

        if (target.type === 'checkbox') {
            // find template in selectedTemplates
            const template = state.selectedTemplates.find(x => x.gtid === parseInt(name));

            const index = state.selectedTemplates.findIndex(x => x.gtid === parseInt(name));
            const newTemplate = state.selectedTemplates.slice();

            if (template.selected === "no") {
                newTemplate[index].selected = "yes";
            } else {
                newTemplate[index].selected = "no";
            }

            setState({
                ...state,
                selectedTemplates: newTemplate,
            });
        } else if (target.type === 'radio') {
            setState({
                ...state,
                [name]: event.target.value,
            });
        } else {
            setState({
                ...state,
                [name] : value,
            });
        }
    }

    const deleteTemplate = async (gtid) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-google-template.php`, {
                gtid: gtid,
            });
            getTemplates();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (gtid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this deletion",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTemplate(gtid);
            }
        });
    }

    const handleSnack = () => {
        setSnack({
            ...snack,
            handler: false,
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const { templates, selectedTemplates, student } = this.state;

        try {
            for (const template of selectedTemplates) {
                if (template.selected === "yes") {
                    const curr = templates.find(item => item.gtid === template.gtid);
                    console.log(curr);
                    await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                        from: curr.from_address,
                        to: curr.to_address,
                        subject: `[${student}] ${curr.subject}`,
                        body: curr.content,
                    });
                }
            }
            setState({
                snackHandler: true,
            });
            setTimeout(() => {
                handleSnack();
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const getTemplates = async() => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-google-templates.php?gtid=`);
            const data = request.data;
            let templates = [];
            for (let i = 0; i < data.length; i++) {
                templates.push({gtid: data[i].gtid, selected: "no"});
            }
            setState({
                ...state,
                templates: data,
                selectedTemplates: templates,
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            getTemplates();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <TemplateContainer>
            <h1>Google Storage Templates</h1>
            <Breadcrumb links={state.links} color="light-blue" />
            <EmailForm onSubmit={handleSubmit}>
                <HDVector />
                <div>
                    <Title>
                        <h2>Send Google Storage Template</h2>
                        <p>Upload a list of recipients from Google Admin and select the desired email template to send.</p>
                    </Title>
                    <Text>
                        <TextInput 
                            id="student"
                            label="Name of Student in Training"
                            placeholder="Student Name"
                            value={state.student}
                            onChange={handleInput}
                            name="student"
                        />
                        <br/>
                        <p>Select Email Template</p>
                        <FormRadios>
                            {state.templates.map((template) => {
                                return (
                                    <TemplateDiv>   
                                        <RadioButton 
                                            name="radio"
                                            id={template.gtid}
                                            value={template.gtid}
                                            label={`${template.tname} Template`}
                                            onChange={handleInput}
                                        />
                                        <Link
                                            key={template.gtid}
                                            to={`${process.env.PUBLIC_URL}/edit-google-template/${template.gtid}`}
                                        >
                                            <EditIcon />
                                        </Link>

                                        <button onClick={e => {e.preventDefault(); handleDelete(template.gtid); }}>
                                            <TrashIcon />
                                        </button>
                                    </TemplateDiv>
                                );
                            })}
                        </FormRadios>
                    </Text>
                </div>
                <div>
                    <a
                        href={`${process.env.PUBLIC_URL}/add-google-template`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button type="button" color="purple">Add Template</Button>
                    </a>
                    <Button color="light-blue">Send Email</Button>
                </div>
                <SnackbarPortal 
                    handler={snack.handler}
                    message={`You have sent email template(s) for: '${state.selectedTemplates.tname}'`}
                    heading="Success!"
                    onClick={handleSnack}
                />
            </EmailForm>
        </TemplateContainer>
    );
}

export default GoogleStorageTemplate;

const TemplateContainer = styled(Container)`
    @media (max-width: 630px) {
        grid-template-columns: 1fr;
    }
`;

const TrashIcon = styled(Trash)`
    margin-left: 5px;
`;

const EmailForm = styled(FormEl)`
    div {
        grid-column: 2;

        @media (max-width: 1040px) {
            grid-column: 1/-1;
        }
    }
    > div {
        > a {
            > button {
                @media (max-width: 1040px) {
                    width: 100%;
                    max-width: 250px;
                }

                @media (max-width: 630px) {
                    float: right;
                    margin-left:
                } 
            }
        }
        > button {
            margin-left: auto;
            max-width: 250px;
            width: 100%;
            float: right;

            @media (max-width: 1040px) {
                margin-left: 10px;
                float: inherit;
                margin-top: 10px;
            }

            @media (max-width: 630px) {
                float: right;
                margin-left: auto;
            }
        }
        @media (max-width: 630px) {
            display: block;
            grid-column: 1/-1;
        }
    }
`;

const FormRadios = styled(Radios)`
    display: block;
`;

const TemplateDiv = styled.div`
    margin: 0 5px 10px !important;
    > div {
        display: inline;
    }
`;
