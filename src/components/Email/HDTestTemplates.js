import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Container from '../Admin/Container';
import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { FormEl, Title } from '../Admin/AcctMgmt/FormComponents';
import { Text } from '../Admin/SchedMgmt/HolidayWizard/HolidayWizardComponents';
import { ReactComponent as HDVector } from '../../images/Email/HDTraining.svg';
import SnackbarPortal from '../SnackbarPortal';

class HDTestTemplates extends Component {
    state = {
        password: false,
        ohana: false,
        expired: false,
        student: '',
        snackHandler: false,
    };

    handleInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSnack = () => {
        this.setState({
            snackHandler: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        
        const { password, ohana, expired, student } = this.state;
        const from = 'lsash@hawaii.edu';
        const to = 'itsmtst@hawaii.edu';
        try {
            if (password) {
                await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                    from: from,
                    to: to,
                    subject: `[${student}] Testing - Forgot my password`,
                    body: `<p>Hi Help Desk,</p>
                    <p>I forgot my password for my UH username: lsash. Can you help me?</p>
                    <br>
                    <p>Thanks,</p>
                    <p>Larry S.</p>`,
                });
            }
            if (ohana) {
                await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                    from: from,
                    to: to,
                    subject: `[${student}] Re: Important Notice - End of access to UH Online Services`,
                    body: `<p>Hi Help Desk,</p>
                    <p>I just want to keep access to my UH email. Does enrolling in 'Ohana services do that?</p>
                    <br>
                    <p>-Larry</p>
                    <p>---------- Forwarded message ---------</p>
                    <p>From: ITS Help Desk <help@hawaii.edu></p>
                    <p>Date: Wed, Feb 2, 2022 at 12:00 AM</p>
                    <p>Subject: Important Notice - End of access to UH Online Services</p>
                    <p>To: Larry Sashimi <lsash@hawaii.edu></p>
                    <br>
                    <p>Dear Larry Sashimi,</p>
                    <p>According to official records, your active association with the University of Hawaii has ended.  You are currently in a grace period where you temporarily continue to have access to basic UH online services until Aug 01, 2022 00:00.</p>
                    <br>
                    <p>If you believe that you are receiving this notification in error, please contact the ITS Help Desk by phone (808) 956-8883, neighbor isles Toll Free (800) 558-2669, or by email at help@hawaii.edu, as soon as possible.</p>
                    <br>
                    <p>IMPORTANT: If you take no action, all data associated with your UH Username will be deleted, including all your email messages and mailboxes.</p>
                    <br>
                    <p>To prevent complete loss of data and services at the end of this grace period, you should:</p>
                    <br>
                    <p>   1)  Enroll in our 'Ohana online services.  Doing this will preserve access to your UH email account and all messages stored there.</p>
                    <br>
                    <p>       For instructions on how to enroll in our 'Ohana online services, please visit: <a href="http://www.hawaii.edu/askus/1137">http://www.hawaii.edu/askus/1137</a></p>
                    <br>
                    <p>       For a full list of 'Ohana online services, please visit: <a href="http://www.hawaii.edu/askus/932">http://www.hawaii.edu/askus/932</a></p>
                    <br>
                    <p>   2) Go to <a href="http://www.hawaii.edu/username">http://www.hawaii.edu/username</a> and be sure that you have Password Reset Questions set up and can answer your questions.  Otherwise, you will not be able to reset your UH Username password once the grace period is over.</p>
                    <br>
                    <p>   3) Save your files and webpages currently stored on UH servers to the hard drive on your local computer.  Note that 'Ohana online services do not include retention of any data other than email, so your webpages will be removed from UH servers at the end of the grace period.</p>
                    <br>
                    <p>       For assistance, you can refer to the following online documents:</p>
                    <p>        o Saving Email and Personal Webpages (Mac OS X): <a href="http://www.hawaii.edu/askus/977">http://www.hawaii.edu/askus/977</a></p>
                    <p>        o Saving Email and Personal Webpages (Windows): <a href="http://www.hawaii.edu/askus/978">http://www.hawaii.edu/askus/978</a></p>
                    <br>
                    <p>   4) Transfer ownership of any UH mailing lists, or any departmental or organizational email accounts or webpages, to another person who is actively affiliated with the University of Hawaii.</p>
                    <br>
                    <p>Should you return to active university status before Aug 01, 2022 00:00, nothing will change; you may continue using basic UH online services without interruption.</p>
                    <br>
                    <p>If you have questions, or need assistance with any of these instructions, please contact the ITS Help Desk by email at help@hawaii.edu as soon as possible:</p>
                    <br>
                    <p>    <a href="http://www.hawaii.edu/its/about/helpdesk.html">http://www.hawaii.edu/its/about/helpdesk.html</a></p>
                    <p>--</p>
                    <p>This information was sent by the UH Identity Management System:</p>
                    <br>
                    <p>    UHIMS: <a href="http://www.hawaii.edu/askus/965">http://www.hawaii.edu/askus/965</a></p>
                    `,
                  });
            }
            if (expired) {
                await axios.post(`${process.env.REACT_APP_DB_SERVER}/send-email.php`, {
                  from: from,
                  to: to,
                  subject: `[${student}] Testing - myUH session expired`,
                  body: `<p>Hi Help Desk,</p>
                  <p>Every time I try to "sign in" to myuh, I receive the following message:session expired. How can I fix this?</p>
                  <br>
                  <p>Thanks,</p>
                  <p>Larry S.</p>`,
                });
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

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const links = [{ title: 'HD Training Templates', to: '/hd-training'}];

        const { password, ohana, expired, student, snackHandler } = this.state;

        return (
          <Container>
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
                          <Checkbox
                              id="password"
                              label="Password Reset Template"
                              onChange={this.handleInput}
                              checked={password}
                              name="password"
                          />
                          <Checkbox
                              id="ohana"
                              label="Ohana Template"
                              onChange={this.handleInput}
                              checked={ohana}
                              name="ohana"
                          />
                          <Checkbox
                              id="expired"
                              label="Session Expired Template"
                              onChange={this.handleInput}
                              checked={expired}
                              name="expired"
                          />
                      </Text>
                  </div>
                  <Button color="light-blue">Send Email</Button>
                  <SnackbarPortal
                      handler={snackHandler}
                      message={`You have sent email template(s) for: '${student}'`}
                      heading="Success!"
                      onClick={this.handleSnack}
                  />
              </EmailForm>
          </Container>
        );
    }
}

export default HDTestTemplates;

const EmailForm = styled(FormEl)`
    div {
      grid-column: 2;
    }
    > button {
      grid-column: 2;
      margin-left: auto;
      max-width: 250px;
      width: 100%;
    }
`;

const HDTraining = styled(HDVector)`
  @media (max-width: 900px) {
    display: none;
  }
`;