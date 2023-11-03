import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Schedule } from '../../../images/icons/Administration/Schedule.svg';
import { ReactComponent as Account } from '../../../images/icons/Administration/Account.svg';
import { ReactComponent as Browser } from '../../../images/icons/Administration/Browser.svg';
import { ReactComponent as Database } from '../../../images/icons/Administration/Database.svg';
import { ReactComponent as Docs } from '../../../images/icons/Administration/Docs.svg';
import { ReactComponent as Manage } from '../../..//images/Admin/Badges/Icons/manage.svg';
import { ReactComponent as Google } from '../../../images/icons/Administration/Google.svg';
import { ReactComponent as Storage } from '../../../images/icons/Administration/Storage.svg';
import { ReactComponent as Training } from '../../../images/icons/Documentation/Reception/Schedules.svg';

const AdministrationDropdownEl = styled.div`
    width: 370px;
`;

const AdministrationDropdown = () => {
    return (
        <AdministrationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <Link to={`${process.env.PUBLIC_URL}/schedmgmt`}>
                            <Heading color="pink">
                                <Schedule />
                                Schedule Management
                            </Heading>
                            <Description>Edit &amp; view schedules/timesheets.</Description>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={`${process.env.PUBLIC_URL}/acctmgmt`}>
                            <Heading color="pink">
                                <Account />
                                Account Management
                            </Heading>
                            <Description>Add/Edit users to HDSupport.</Description>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://www.hawaii.edu/help/hdsupport/browser/index.php"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <Browser />
                                Browser Recommendations
                            </Heading>
                            <Description>Manage the browser matrix.</Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <Link to={`${process.env.PUBLIC_URL}/badgemgmt`}>
                            <Heading color="pink">
                                <Manage />
                                Manage Badges
                            </Heading>
                            <Description>Manage HD Badges.</Description>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <a
                            href="https://www.hawaii.edu/help/hdsupport/google-availability/index.php"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink">
                                <Google />
                                Google Availability
                            </Heading>
                            <Description>Manage the Google Availability matrix.</Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <Link to={`${process.env.PUBLIC_URL}/leave-request`}>
                            <Heading color="pink">
                                <Schedule />
                                Leave Requests
                            </Heading>
                            <Description>Create and manage leave requests.</Description>
                        </Link>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <Link to={`${process.env.PUBLIC_URL}/google-storage`}>
                            <Heading color="pink">
                                <Storage />
                                Google Storage Templates
                            </Heading>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={`${process.env.PUBLIC_URL}/hd-training`}>
                            <Heading color="pink">
                                <Training />
                                Training Templates
                            </Heading>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <a href="https://www.hawaii.edu/help/hdsupport/docs" target="_blank" rel="noopener noreferrer">
                            <Heading color="pink">
                                <Docs />
                                Developer Docs
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a
                            href="https://depts.its.hawaii.edu/dwb/phpMyAdmin-41/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="pink" noMarginBottom>
                                <Database />
                                PHP MyAdmin
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </AdministrationDropdownEl>
    );
};

export default AdministrationDropdown;
