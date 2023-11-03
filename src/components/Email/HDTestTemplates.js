import React, { Component } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import { Text } from '../Admin/SchedMgmt/HolidayWizard/HolidayWizardComponents';
import { ReactComponent as HDVector } from '../../images/Email/HDTraining.svg';
import SnackbarPortal from '../SnackbarPortal';
import { ReactComponent as EditIcon } from '../../images/icons/Email/Edit.svg';
import { ReactComponent as Trash } from '../../images/icons/Email/Trash.svg';

class HDTestTemplates extends Component {
    state = {
        student: '',
        snackHandler: false,
        templates: [],
        selectedTemplates: [],
    };

    handleInput = event => {
        const { selectedTemplates } = this.state;
        const target = event.target;
        const value = target.value;
        const name = target.name;


        if (target.type === 'checkbox') {
            // find the template in selectedTemplates
            const template = selectedTemplates.find(x => x.tid === parseInt(name));

            const index = selectedTemplates.findIndex(x => x.tid === parseInt(name));
            const newTemplate = selectedTemplates.slice();

            if (template.selected === "no") {
                newTemplate[index].selected = "yes";
            } else {
                newTemplate[index].selected = "no";
            }

            this.setState({
                selectedTemplates: newTemplate,
            });
        } else {
            this.setState({
                [name]: value,
            });
        }

    };

    deleteTemplate = async (tid) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-email-template.php`, {
                tid: tid,
            });
            this.getTemplates();
        } catch (error) {
            console.log(error);
        }
    }

    handleDelete = async (tid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this deletion",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteTemplate(tid);
            }
        });
        
    }

    handleSnack = () => {
        this.setState({
            snackHandler: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        
        const { templates, selectedTemplates, student } = this.state;

        try {
            for (const template of selectedTemplates) {
                if (template.selected === "yes") {
                    const curr = templates.find(item => item.tid === template.tid);
                    console.log(curr);
                    await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                        from: curr.from_address,
                        to: curr.to_address,
                        subject: `[${student}] ${curr.subject}`,
                        body: curr.content,
                    });
                } 
            }
            this.setState({
                snackHandler: true,
            });
            this.timerId = setTimeout(() => {
                this.handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    async getTemplates() {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-email-templates.php?tid=`);
            const data = request.data;
            let templates = [];
            for (let i = 0; i < data.length; i++) {
                templates.push({tid: data[i].tid, selected: "no"});
            }
            this.setState({
                templates: data,
                selectedTemplates: templates,
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    async componentWillMount() {
        this.getTemplates();
    }

    render() {
        const links = [{ title: 'HD Training Templates', to: '/hd-training'}];

        const { student, snackHandler, templates, selectedTemplates } = this.state;

        return (
          <TemplateContainer>
              <h1>HD Training Email Templates</h1>
              <Breadcrumb links={links} color="light-blue" />
              <EmailForm onSubmit={this.handleSubmit}>
                    <HDTraining />
                    <div>
                      <Title>
                          <h2>Send Email Templates</h2>
                          <p>
                              Enter the student's name and select the desired email templates to send to the test environment.
                          </p>
                      </Title>
                      <Text>
                          <TextInput
                              id="student"
                              label="Name of Student in Training"
                              placeholder="Student Name"
                              value={student}
                              onChange={this.handleInput}
                              name="student"
                          />
                          <br/>
                          <p>Select Email Templates</p>
                          {templates.map((template) => {
                            return (
                                <TemplateDiv>
                                    <Checkbox
                                        id={template.tid}
                                        label={`${template.tname} Template`}
                                        onChange={this.handleInput}
                                        checked={selectedTemplates.find(x => x.tid === template.tid).selected === "yes"}
                                        name={template.tid}
                                    />
                                    <Link
                                        key={template.tid}
                                        to={`${process.env.PUBLIC_URL}/edit-template/${template.tid}`}
                                    >
                                        <EditIcon />
                                    </Link>
                                    <button onClick={e => {e.preventDefault(); this.handleDelete(template.tid)}}>
                                        <TrashIcon />
                                    </button>
                                </TemplateDiv>
                            );
                          })}
                      </Text>
                    </div>
                    <div>
                        <a
                            href={`${process.env.PUBLIC_URL}/add-template`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button type="button" color="purple">Add Template</Button>
                        </a>
                        <Button color="light-blue">Send Email</Button>
                    </div>
                    <SnackbarPortal
                        handler={snackHandler}
                        message={`You have sent email template(s) for: '${student}'`}
                        heading="Success!"
                        onClick={this.handleSnack}
                    />
              </EmailForm>
          </TemplateContainer>
        );
    }
}

export default HDTestTemplates;

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
                    margin-left: auto;
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

const HDTraining = styled(HDVector)`
  @media (max-width: 1040px) {
    display: none;
  }
`;

const TemplateDiv = styled.div`
  > div {
    display: inline;
  }
`;