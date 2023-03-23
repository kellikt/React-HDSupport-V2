import React from 'react';
import styled from '@emotion/styled';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as AskUs } from '../../../images/icons/UserDocs/AskUs.svg';
import { ReactComponent as Reps } from '../../../images/icons/UserDocs/Reps.svg';
import { ReactComponent as Labs } from '../../../images/icons/UserDocs/Labs.svg';
import { ReactComponent as AnR } from '../../../images/icons/UserDocs/AnR.svg';
import { ReactComponent as Checklist } from '../../../images/icons/UserDocs/Checklist.svg';
import { ReactComponent as Policy } from '../../../images/icons/UserDocs/Policy.svg';

const UserDocsDropdownEl = styled.div`
    width: 335px;
`;

const UserDocsDropdown = () => {
    return (
        <UserDocsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a href="https://hawaii.edu/askus/" target="_blank" rel="noopener noreferrer">
                            <Heading color="gold">
                                <AskUs />
                                Askus Articles
                            </Heading>
                            <Description>A collection of instructional articles.</Description>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://www.hawaii.edu/myuhinfo/password-reset/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="gold">
                                <Reps />
                                UH Campus Reps
                            </Heading>
                            <Description>Hours &amp; of PW reset reps.</Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a
                            href="https://www.hawaii.edu/myuhinfo/admissions-records/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="gold" noMarginBottom>
                                <AnR />
                                A&amp;R Representatives
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a href="https://www.hawaii.edu/its/help-desk/" target="_blank" rel="noopener noreferrer">
                            <Heading color="gold">
                                <Policy /> ITS Help Desk Homepage
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="https://www.hawaii.edu/askus/588" target="_blank" rel="noopener noreferrer">
                            <Heading color="gold">
                                <Checklist /> ITS Support Policy
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="https://www.hawaii.edu/itslab/" target="_blank" rel="noopener noreferrer">
                            <Heading color="gold" noMarginBottom>
                                <Labs />
                                ITS Labs Homepage
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </UserDocsDropdownEl>
    );
};

export default UserDocsDropdown;
