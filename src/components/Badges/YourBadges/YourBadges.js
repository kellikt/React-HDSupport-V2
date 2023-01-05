import React from 'react';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';

import BadgeIconContainer from './BadgeIconContainer';

const YourBadges = () => {

    const links = [
        { title: 'Badges', to: '/badges/'},
        { title: 'Your Badges', to: '/badges/your-badges/'}
    ];

    return (
        <Container>
            <h1>Your Badges</h1>
            <Breadcrumb links={links} color="dark-grey" />
            <BadgeIconContainer />
        </Container>    
    );
};

export default YourBadges;
