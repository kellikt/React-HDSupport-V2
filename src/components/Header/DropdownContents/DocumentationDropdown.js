import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Documentation } from '../../../images/icons/Documentation/documentation.svg';
import { ReactComponent as Checklist } from '../../../images/icons/Documentation/Checklist.svg';
import { ReactComponent as Phone } from '../../../images/icons/Documentation/Phone.svg';
import { ReactComponent as Schedules } from '../../../images/icons/Documentation/Schedules.svg';
import { ReactComponent as BuildingIP } from '../../../images/icons/Documentation/BuildingIP.svg';

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

const DocumentationDropdown = () => {
    return (
        <DocumentationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a href="/">
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
                            <a href="/">Phones</a>
                            <a href="/">Attendance</a>
                            <a href="/">Email</a>
                            <a href="/">General Policies</a>
                        </div>
                        <div>
                            <h4>Popular Docs</h4>
                            <a href="/">ID Management</a>
                            <a href="/">File Drop</a>
                            <a href="/">Service Window</a>
                            <a href="/">Data Center Access</a>
                        </div>
                    </DocsContainer>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a href="/">
                            <Heading>
                                <Schedules />
                                Help Desk Schedules
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="/">
                            <Heading>
                                <BuildingIP />
                                Building IP List
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="/">
                            <Heading>
                                <Phone />
                                Phone Numbers &amp; Useful Info
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="/">
                            <Heading>
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
