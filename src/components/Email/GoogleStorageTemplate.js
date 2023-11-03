import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import CsvDownloadButton from 'react-json-to-csv';

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
        file: '',
        templates: [],
        selectedTemplate: '',
        links: [{ title: 'Google Storage Templates', to: '/google-storage' }],
        logButton: false,
        logData: [],
    });

    const [snack, setSnack] = useState({
        handler: false,
        heading: '',
        message: '',
        radio: '',
        isError: false,
    });

    const handleInput = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            ...state,
            selectedTemplate: value,
        });
    };

    const handleFileChange = (event) => {
        setState({
            ...state,
            logButton: false,
            file: event.target.files[0],
        });
    };

    const deleteTemplate = async (gtid) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-google-template.php`, {
                gtid: gtid,
            });
            getTemplates();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (gtid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this deletion",
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTemplate(gtid);
            }
        });
    };

    const handleSnack = () => {
        console.log(state.logData);
        setSnack({
            ...snack,
            handler: false,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { file, selectedTemplate } = state;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('selectedTemplate', selectedTemplate);

        try {
            const response = await axios.post(`${process.env.REACT_APP_DB_SERVER}/google-test.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data[0]) {
                setSnack({
                    ...state,
                    message: `You have sent email templates. ${response.data[0][1]} emails successfully sent.`,
                    handler: true,
                });
                setState({
                    ...state,
                    logButton: true,
                    logData: response.data[0][2],
                });
                setTimeout(() => {
                    handleSnack();
                }, 3000);
            } else {
                console.log(response.data[0][1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTemplates = async () => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-google-templates.php?gtid=`);
            const data = request.data;
            let templates = [];
            for (let i = 0; i < data.length; i++) {
                templates.push({ gtid: data[i].gtid, selected: 'no' });
            }
            setState({
                ...state,
                templates: data,
                selectedTemplate: '',
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            getTemplates();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <TemplateContainer>
            <h1>Google Storage Templates</h1>
            <Breadcrumb links={state.links} color="light-blue" />
            <div>
                    {state.logButton && (
                        <CsvDownloadButton
                            data={state.logData}
                            style={{
                                color: 'var(--white)',
                                lineHeight: '1.5',
                                padding: '0.5em 2em',
                                fontWeight: '600',
                                transition: 'all 0.15s ease',
                                outline: 0,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
                                boxShadow: '0 1px 2px 0 rgba(74, 144, 226, 0.44), 0 2px 8px 0 rgba(0, 0, 0, 0.14)',
                                background: 'var(--green-button)',
                                borderRadius: '6px',
                                fontSize: '16px',
                                marginTop: '10px',
                            }}
                        >
                            Download Log
                        </CsvDownloadButton>
                    )}
                </div>
            <EmailForm onSubmit={handleSubmit}>
                <HDVector />
                <div>
                    <Title>
                        <h2>Send Google Storage Template</h2>
                        <p>
                            Upload a list of recipients from Google Admin and select the desired email template to send.
                        </p>
                    </Title>
                    <Text>
                        <input type="file" onChange={handleFileChange} />
                        <br />
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

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(template.gtid);
                                            }}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </TemplateDiv>
                                );
                            })}
                        </FormRadios>
                    </Text>
                </div>
                <div>
                    <a href={`${process.env.PUBLIC_URL}/add-google-template`} target="_blank" rel="noopener noreferrer">
                        <Button type="button" color="purple">
                            Add Template
                        </Button>
                    </a>
                    <Button color="light-blue">Send Email</Button>
                </div>
                <SnackbarPortal
                    handler={snack.handler}
                    message={snack.message}
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
                    margin-left: ;
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
