import React from 'react';
import styled from '@emotion/styled';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Slack } from '../../../images/icons/Tools/Slack.svg';
import { ReactComponent as Simp } from '../../../images/icons/Tools/Simp.svg';
import { ReactComponent as UHIMC } from '../../../images/icons/Tools/UHIMC.svg';
import { ReactComponent as Gmail } from '../../../images/icons/Tools/Gmail.svg';
import { ReactComponent as Software } from '../../../images/icons/Tools/Software.svg';
import { ReactComponent as Rio } from '../../../images/icons/Tools/Rio.svg';
import { ReactComponent as IP } from '../../../images/icons/Tools/IP.svg';

const ToolsDropdownEl = styled.div`
    width: 405px;
`;

const ToolsDropdown = ({ roles: { tech } }) => {
    return (
        <ToolsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a href="https://csocits.slack.com/" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <Slack />
                                Slack
                            </Heading>
                            <Description>Slide into those DMs.</Description>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="https://www.hawaii.edu/uhimc/" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <UHIMC />
                                UHIMC
                            </Heading>
                            <Description>Lookup UH official records. (For official use only)</Description>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="CherwellClient://commands/goto" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <Simp />
                                Cherwell
                            </Heading>
                            <Description>Access our current ticket system.</Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="https://128.171.28.172/icinga/" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <IP />
                                Icinga
                            </Heading>
                            <Description>Access Icinga.</Description>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>

            <DropdownSection>
                <ul>
                    <ListItem>
                        <a href="https://mail.google.com/a/hawaii.edu/" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <Gmail />
                                UH Gmail
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="http://www.hawaii.edu/its/id/" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <Rio />
                                Dept/RIO Management
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom={tech ? false : true}>
                        <a href="https://www.hawaii.edu/software" target="_blank" rel="noopener noreferrer">
                            <Heading color="light-blue">
                                <Software />
                                Software Download Page
                            </Heading>
                        </a>
                    </ListItem>
                    {tech && (
                        <ListItem noMarginBottom>
                            <a
                                href="https://www.hawaii.edu/software/tech_download.php"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Heading color="light-blue" noMarginBottom>
                                    <Software />
                                    Tech Software Page
                                </Heading>
                            </a>
                        </ListItem>
                    )}
                </ul>
            </DropdownSection>
        </ToolsDropdownEl>
    );
};

export default ToolsDropdown;
