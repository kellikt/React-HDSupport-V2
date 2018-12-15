import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Documentation } from '../../../images/icons/Documentation/documentation.svg';
import { ReactComponent as Checklist } from '../../../images/icons/Documentation/Checklist.svg';
import { ReactComponent as Phone } from '../../../images/icons/Documentation/Phone.svg';
import { ReactComponent as Schedules } from '../../../images/icons/Documentation/Schedules.svg';
import { ReactComponent as BuildingIP } from '../../../images/icons/Documentation/BuildingIP.svg';

const DocumentationDropdown = ({ roles: { helpDesk } }) => {
    return (
        <DocumentationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a
                            href={
                                helpDesk
                                    ? 'https://www.hawaii.edu/bwiki/display/help/Home'
                                    : 'https://www.hawaii.edu/bwiki/display/itslab/ITS+Computer+Lab+Monitor+Handbook'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading>
                                <Documentation />
                                {helpDesk ? 'Help Desk Wiki' : 'Lab Wiki'}
                            </Heading>
                            <Description>Review any Help Desk procedure.</Description>
                        </a>
                    </ListItem>

                    <DocsContainer>
                        <div>
                            <h4>Common Docs</h4>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Phone+Procedures+and+FAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Phones
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Schedule+and+Attendance+Policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Attendance
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Email+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Email
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Help+Desk+Policies+and+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                General Policies
                            </a>
                        </div>
                        <div>
                            <h4>Popular Docs</h4>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/ID+Management+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ID Management
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/File+Drop+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                File Drop
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Service+Window+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Service Window
                            </a>
                            <a
                                href="https://www.hawaii.edu/bwiki/display/help/Data+Center+Access+Procedures"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Data Center Access
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
                            href="https://www.hawaii.edu/help/hdsupport/get_file.php?showfile=yes&fid=1309"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading>
                                <BuildingIP />
                                Building IP List
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://www.hawaii.edu/bwiki/display/help/Phone+Numbers+and+Useful+Info"
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
    );
};

export default DocumentationDropdown;

const DocumentationDropdownEl = styled.div`
    width: 390px;
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
