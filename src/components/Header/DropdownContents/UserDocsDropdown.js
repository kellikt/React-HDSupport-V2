import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as AskUs } from '../../../images/icons/UserDocs/AskUs.svg';
import { ReactComponent as Reps } from '../../../images/icons/UserDocs/Reps.svg';
import { ReactComponent as Labs } from '../../../images/icons/UserDocs/Labs.svg';
import { ReactComponent as AnR } from '../../../images/icons/UserDocs/AnR.svg';
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
                        <a href="/">
                            <Heading color="gold">
                                <AskUs />
                                Askus Articles
                            </Heading>
                            <Description>A collection of instructional articles.</Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="/">
                            <Heading color="gold">
                                <Reps />
                                ITS Campus Reps
                            </Heading>
                            <Description>Hours &amp; of PW reset reps.</Description>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a href="/">
                            <Heading color="gold">
                                <Policy /> ITS Support Policy
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="/">
                            <Heading color="gold">
                                <Labs />
                                ITS Labs Homepage
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="/">
                            <Heading color="gold">
                                <AnR />
                                A&amp;R Representatives
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </UserDocsDropdownEl>
    );
};

export default UserDocsDropdown;
