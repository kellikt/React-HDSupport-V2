import React from 'react';

import Container from '../../Admin/Container';
import DisplayBadgesForm from './DisplayBadgesForm';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

const DisplayBadges = () => {
    const links = [
        { title: 'Badges Management', to: '/badgemgmt' },
        { title: 'Display Badges', to: '/badgemgmt/editbadge' },
    ];

    return (
        <Container>
            <h1>Display Badges</h1>
            <Breadcrumb links={links} color="purple" />
            <DisplayBadgesForm />
            <Background color="purple" />
        </Container>
    );
};

export default DisplayBadges;
