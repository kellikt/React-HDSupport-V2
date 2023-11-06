import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Home } from '../../..//images/Admin/Badges/Icons/home.svg';
import { ReactComponent as YourBadges } from '../../..//images/Admin/Badges/Icons/yourbadges.svg';

const DownloadsDropdownEl = styled.div`
    width: 390px;
`;

const BadgesDropdown = () => {
    return (
        <DownloadsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <Link to={`${process.env.PUBLIC_URL}/badges`}>
                            <Heading color="dark-grey">
                                <Home />
                                Badges Home
                            </Heading>
                            <Description>View badge activity.</Description>
                        </Link>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <Link to={`${process.env.PUBLIC_URL}/badges/your-badges`}>
                            <Heading color="dark-grey">
                                <YourBadges />
                                Your Badges
                            </Heading>
                            <Description>Manage your badges.</Description>
                        </Link>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DownloadsDropdownEl>
    );
};

export default BadgesDropdown;
