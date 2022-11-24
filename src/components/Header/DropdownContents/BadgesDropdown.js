import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Downloads } from '../../../images/icons/Downloads/Downloads.svg';
import { ReactComponent as Contract } from '../../../images/icons/Downloads/Contract.svg';

const DownloadsDropdownEl = styled.div`
    width: 390px;
`;

const WaiversContainer = styled.div`
    display: block;
    margin: 24px 0 0 33px;
`;

const DownloadsLink = styled.a`
    color: #32b783;
    font-weight: 500;
    transition: color 0.1s ease;
    display: block;
    line-height: 25px;

    &:hover {
        color: var(--black);
    }
`;

const BadgesDropdown = () => {
    return (
        <DownloadsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem noMarginBottom noLink>
                        <Heading color="green">
                            <Downloads />
                            Badges Home
                        </Heading>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem noMarginBottom>
                        <Link to={`${process.env.PUBLIC_URL}/badgemgmt`}>
                            <Heading color="green" noMarginBottom>
                                <Contract />
                                Manage Badges
                            </Heading>
                        </Link>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DownloadsDropdownEl>
    );
};

export default BadgesDropdown;
