import React from 'react';
import styled from '@emotion/styled';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';
import BadgesHomeForm from './BadgesHomeForm';
import { ActivityHeader } from './BadgesHomeComponents';
import { ReactComponent as HeaderIcon } from '../../../images/Admin/Badges/Icons/header.svg';
import BadgeFeed from './BadgeFeed';

const BadgesHome = () => {
    const links = [
        { title: 'Badges', to: '/badges/' },
    ];

    return (
        <Container>
            <h1>Badges</h1>
            <Breadcrumb links={links} color="dark-grey" />
            <Background color="gold" />
            <BadgesHomeForm />
            <ActivityHeader><StyledHeaderIcon /><h2>Badge Activity</h2></ActivityHeader>
            <BadgeFeed />
        </Container>
    );
};

export default BadgesHome;

const StyledHeaderIcon = styled(HeaderIcon)`
    display: inline;
    width: 5em;
    height: 5em;
`;
