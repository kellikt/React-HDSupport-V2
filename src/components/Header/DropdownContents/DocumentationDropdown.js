import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Documentation } from '../../../images/icons/Documentation/documentation.svg';
import { ReactComponent as Checklist } from '../../../images/icons/Documentation/Checklist.svg';
import { ReactComponent as Phone } from '../../../images/icons/Documentation/Phone.svg';
import { ReactComponent as Schedules } from '../../../images/icons/Documentation/Schedules.svg';
import { ReactComponent as LabChecklist } from '../../../images/icons/Documentation/Labs/Checklist.svg';
import { ReactComponent as LabSchedules } from '../../../images/icons/Documentation/Labs/Schedules.svg';
import { ReactComponent as LabDocumentation } from '../../../images/icons/Documentation/Labs/documentation.svg';
import { ReactComponent as LabContract } from '../../../images/icons/Documentation/Labs/Contract.svg';
import { ReactComponent as LabPhone } from '../../../images/icons/Documentation/Labs/Phone.svg';
import { ReactComponent as ReceptDocumentation } from '../../../images/icons/Documentation/Reception/documentation.svg';
import { ReactComponent as ReceptPhone } from '../../../images/icons/Documentation/Reception/Phone.svg';
import { ReactComponent as ReceptVisitor } from '../../../images/icons/Documentation/Reception/Contract.svg';
import { ReactComponent as ReceptMail } from '../../../images/icons/Documentation/Reception/Email.svg';
import { ReactComponent as ReceptChecklist } from '../../../images/icons/Documentation/Reception/Checklist.svg';
import { ReactComponent as ReceptSchedules} from '../../../images/icons/Documentation/Reception/Schedules.svg';

const DocumentationDropdown = ({ roles: { helpDesk } }) => {
    return (
        <div>
        <HorizontalList>
        <DocumentationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a
                            href='https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818330/Labs+Documentation'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color='light-blue'>
                                <LabDocumentation />
                                Lab Wiki
                            </Heading>
                            <Description>Review any Lab Monitor procedure.</Description>
                        </a>
                    </ListItem>

                    <LabDocsContainer>
                        <div>
                            <h4>Common Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818309/Phone+Usage"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Phones
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818161/ITS+Computer+Lab+Monitor+Policies#ITSComputerLabMonitorPolicies-AttendancePolicy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Attendance
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818161/ITS+Computer+Lab+Monitor+Policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                General Policies
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818167/ITS+Lab+Rules+Policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ITS Lab Policies
                            </a>
                        </div>
                        <div>
                            <h4>Popular Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818314/Opening+Closing+and+Lab+Unattended+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Opening and Closing Procedures
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818327/Lab+Software+Updates"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Software Updates
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820056/Service+Window+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Service Window
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818246/Printing+in+the+Labs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Printing
                            </a>
                        </div>
                    </LabDocsContainer>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a
                            href="https://drive.google.com/drive/folders/0Byo69lUtfgcqQnVleWxTbG1IcVE?resourcekey=0-b4b4G--uKG3aA-guY_zLPw"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="light-blue">
                                <LabSchedules />
                                Lab Schedules
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1tPWY28f7HRrjszglchyd7nFaarYiJp0EeqGRAQ_ae90/edit#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="light-blue">
                                <LabPhone />
                                Phone Numbers &amp; Useful Info
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1QLwBCLIuNXM2EcidhUWI3CNrM831i-TuZ2ONH2yHlNg/edit#gid=1820989110"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="light-blue">
                                <LabChecklist />
                                Lab Software Update Sheet
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1qcZ35_apSZZdqtL2yhZ6gBgpSqm8GIDW-LYl5549Sdk/edit#gid=375649893"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="light-blue" noMarginBottom>
                                <LabContract />
                                Lab Cleaning Sheet
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DocumentationDropdownEl>
        <DocumentationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a
                            href='https://uhawaii.atlassian.net/wiki/spaces/help/overview?homepageId=4817040'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading>
                                <Documentation />
                                Help Desk Wiki
                            </Heading>
                            <Description>Review any Help Desk procedure.</Description>
                        </a>
                    </ListItem>

                    <DocsContainer>
                        <div>
                            <h4>Common Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820150/Phone+Procedures+and+FAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Phones
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820137/Schedule+and+Attendance+Policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Attendance
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820144/Help+Desk+Policies+and+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                General Policies
                            </a>
                        </div>
                        <div>
                            <h4>Popular Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820131/ID+Management+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ID Management
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820332/CAS+Multifactor+Authentication+MFA+DUO"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                MFA Procedures
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820111/File+Drop+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                File Drop
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820414/Operations+Monitoring"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                OC Monitoring
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4819337/Laulima+Support+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Laulima Support
                            </a>
                        </div>
                    </DocsContainer>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a
                            href="https://drive.google.com/drive/folders/0B4v6QnBNmu9KMVdqYXFqeGVndEE"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading>
                                <Schedules />
                                Help Desk Schedules
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1tPWY28f7HRrjszglchyd7nFaarYiJp0EeqGRAQ_ae90/edit#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading>
                                <Phone />
                                Phone Numbers &amp; Useful Info
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1EKtgS_CrdjCTtQGfuk461VzbjjBTYBkW0mOpt2ZjhcE/edit#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading noMarginBottom>
                                <Checklist />
                                Operations Checklist
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DocumentationDropdownEl>
        <DocumentationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a
                            href='https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818238/Reception+Desk+Procedures+and+Info'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <ReceptDocumentation />
                                Reception Desk
                            </Heading>
                            <Description>Review any Reception Desk procedure.</Description>
                        </a>
                    </ListItem>

                    <ReceptDocsContainer>
                        <div>
                            <h4>Common Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4817188/Phone+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Phones
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818161/ITS+Computer+Lab+Monitor+Policies#ITSComputerLabMonitorPolicies-AttendancePolicy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Attendance
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818161/ITS+Computer+Lab+Monitor+Policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                General Policies
                            </a>
                        </div>
                        <div>
                            <h4>Popular Docs</h4>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818234/Opening+Closing+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Opening and Closing Procedures
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818242/Mail+and+Packages"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mail Runs
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4818719/FMO+Access+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FMO Access
                            </a>
                            <a
                                href="https://uhawaii.atlassian.net/wiki/spaces/help/pages/4820686/Data+Center+Access+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Data Center Access
                            </a>
                        </div>
                    </ReceptDocsContainer>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a
                            href="https://drive.google.com/drive/folders/0Byo69lUtfgcqQnVleWxTbG1IcVE?resourcekey=0-b4b4G--uKG3aA-guY_zLPw"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <ReceptSchedules />
                                Lab Schedules
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1tPWY28f7HRrjszglchyd7nFaarYiJp0EeqGRAQ_ae90/edit#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <ReceptPhone />
                                Phone Numbers &amp; Useful Info
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1-_TU2GCz1Twk-rWTpw_ZVXBHN7wylH76KBSQr-2sucA/edit#gid=1415708749"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <ReceptVisitor />
                                ITC Visitor Log
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1NLO6tph7GqgM_VwHt-4IhgtZQqS-o5MMVCgsDCZwHdw/edit#gid=1402120449"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <ReceptMail />
                                Reception Desk Mail Log
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1cW-hz2QRMEcEzgdciTV7jsjdWo-omyScvToiljWmch8/edit#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink" noMarginBottom>
                                <ReceptChecklist />
                                Data Center Master Access List
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DocumentationDropdownEl>
        </HorizontalList>
        </div>
    );
};

export default DocumentationDropdown;

const HorizontalList = styled.ul`
    display: flex;
    @media screen and (max-width: 900px) {
        display: block;
    }
`;

const DocumentationDropdownEl = styled.div`
    width: 390px;
`;

const ReceptDocsContainer = styled.div`
    margin-left: 33px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    h4 {
        color: #8898aa;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin: 0 0 6px;
    }

    a {
        color: var(--pink);
        font-weight: 500;
        transition: color 0.1s ease;
        line-height: 25px;
        display: block;

        &:hover {
            color: var(--black);
        }
    }
`;

const LabDocsContainer = styled.div`
    margin-left: 33px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    h4 {
        color: #8898aa;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin: 0 0 6px;
    }

    a {
        color: var(--light-blue);
        font-weight: 500;
        transition: color 0.1s ease;
        line-height: 25px;
        display: block;

        &:hover {
            color: var(--black);
        }
    }
`;

const DocsContainer = styled.div`
    margin-left: 33px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    h4 {
        color: #8898aa;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin: 0 0 6px;
    }

    a {
        color: var(--blue);
        font-weight: 500;
        transition: color 0.1s ease;
        line-height: 25px;
        display: block;

        &:hover {
            color: var(--black);
        }
    }
`;
