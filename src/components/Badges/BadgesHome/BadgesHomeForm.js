import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LayoutContext } from '../../../LayoutContext';
import { ReactComponent as HomeIcon } from '../../../images/Admin/Badges/BadgeHome.svg';
import { Inputs } from '../../Admin/SchedMgmt/ClockMetrics/MetricsFormComponents';

class BadgesHomeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: '',
            helpdesk: [],
            lab: [],
            third_shift: [],
            leapstart: [],
        }
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            searched: false,
        });
    };

    async componentDidMount() {
        try {
            const helpdesk = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=helpdesk`);
            const lab = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=lab`);
            const third_shift = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=third_shift`);
            const leapstart = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-list-students.php?role=leapstart`);

            const data = await Promise.all([helpdesk, lab, third_shift, leapstart]);
            this.setState({
                helpdesk: data[0].data,
                lab: data[1].data,
                third_shift: data[2].data,
                leapstart: data[3].data
            });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { helpdesk, lab, third_shift, leapstart, selectedUser } = this.state;
        const { username } = this.context;
        return(
            <HomeForm>
                <Title>
                    <h2>Badge Home</h2>
                    <p>Manage your badges or view another student's badges.</p>
                </Title>
                <StudentGroup>
                    <p>Choose your favorite badges in the "Your Badges" page or view your HD profile in the "Your Profile" page.</p>
                    <BadgeLabel>
                        <p>Manage your badges:</p>
                        <a
                            href={`${process.env.PUBLIC_URL}/badges/your-badges`}
                            target="_blank"
                            rel="nopener noreferrer"
                        >
                            <BadgeButton>Your Badges</BadgeButton>
                        </a>
                    </BadgeLabel>
                    <BadgeLabel>
                        <p>View your HD Profile:</p>
                        <a
                            href={`${process.env.PUBLIC_URL}/badges/${username}`}
                            target="_blank"
                            rel="nopener noreferrer"
                        >
                            <BadgeButton>Your Profile</BadgeButton>
                        </a>
                    </BadgeLabel>
                </StudentGroup>
                <HomeIcon />
                <StudentProfile>
                    <p>View another student's profile:</p>
                    <ProfileInputs>
                        <div>
                            <label htmlFor="profile">Student</label>
                            <select name="selectedUser" id="profile" onChange={this.handleChange} value={selectedUser}>
                                <option value="None">Select a Student</option>
                                <optgroup label="Help Desk">
                                        {helpdesk.map(student => {
                                            return (
                                                <option value={student.username} key={student.uid}>{`${
                                                    student.last_name
                                                }, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Lab Monitors">
                                        {lab.map(student => {
                                            return (
                                                <option value={student.username} key={student.uid}>{`${
                                                    student.last_name
                                                }, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Third Shift">
                                        {third_shift.map(student => {
                                            return (
                                                <option value={student.username} key={student.uid}>{`${
                                                    student.last_name
                                                }, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                                    <optgroup label="Leap Start">
                                        {leapstart.map(student => {
                                            return (
                                                <option value={student.username} key={student.uid}>{`${
                                                    student.last_name
                                                }, ${student.first_name}`}</option>
                                            );
                                        })}
                                    </optgroup>
                            </select>
                        </div>
                        <a
                            href={`${process.env.PUBLIC_URL}/badges/${selectedUser}`}
                            target="_blank"
                            rel="nopener noreferrer"
                        >
                            <BadgeButton>View Profile</BadgeButton>
                        </a>
                    </ProfileInputs>
                </StudentProfile>
            </HomeForm>
        );
    }

}

BadgesHomeForm.contextType = LayoutContext;
export default BadgesHomeForm;

const ProfileInputs = styled(Inputs)`
    display: grid;
    grid-template-columns: 1fr;
    div:first-of-type {
      width: 100%;
    }
`;

const StudentProfile = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1em;

    p {
        margin: 0;
        color: var(--dark-grey);

        @media (max-width: 1250px) {
          font-size: 15px;
        }
    }

    select {
        @media (max-width: 1064px) {
            width: 50%
        }
    }

    button {
        width: 66%

        @media (max-width: 1064px) {
            width: 25%
        }
        @media (max-width: 720px) {
            width: 50%
        }
    }

    @media (max-width: 1064px) {
      grid-column: 1;
  }

`;

const HomeForm = styled.div`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 18px;
    align-items: center;

    > svg {
        width: 14em;
        height: auto;
        margin-left: 25%;

        @media (max-width: 1064px) {
            display: none;
        }
    }

    > div {
        margin-top: 2em;
    }

    @media (max-width: 1064px) {
        grid-template-columns: 1fr
    }

`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 1/3;

    h2 {
      font-size: 28px;
      margin: 0 0 4px;
      color: #000;
      grid-column: 1;
    }

    p {
        margin: 0;
        color: var(--dark-grey);
        grid-column: 1;
    }

`;

const StudentGroup = styled.div`
    grid-column: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.5em;
    grid-row-gap: 1em;

    p {
        color: var(--dark-grey);
        grid-column: 1/3;

        @media (max-width: 1250px) {
          font-size: 15px;
        }
    }

    @media (max-width: 1064px) {
        grid-column: 1;
  }
`;

const BadgeLabel = styled.div`
    display: grid;
    grid-template-columns: 1fr;


    p {
        color: var(--dark-grey);
        grid-column: 1;
        margin-bottom: 0;
    }

    button {
        width: 100%;

        @media (max-width: 1064px) {
            width: 50%
        }

        @media (max-width: 770px) {
            width: 75%
        }

        @media (max-width: 570px) {
            width: 100%
        }
    }

`;

const BadgeButton = styled.button`
    margin-right: 0;
    margin-left: auto;
    color: var(--white);
    line-height: 1.5;
    padding: 0.5em 2em;
    font-weight: 600;
    transition: all 0.15s ease;
    outline: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    box-shadow: 0 1px 2px 0 rgba(74, 144, 226, 0.44), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
    background: var(--dark-grey-button);
    border-radius: 6px;
    font-size: 16px;
    grid-column: 1/3;
    margin-top: 1em;

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(1px);
    }

    @media (max-width: 1250px) {
        font-size: 15px;
    }
`;
