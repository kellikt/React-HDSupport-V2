import React from 'react';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';
import BadgesFormFeature from './BadgesFormFeature';

const BadgesHome = () => {
    const links = [
        { title: 'Badges', to: '/badges/' },
    ];

    return (
        <Container>
            <h1>Badges</h1>
            <Breadcrumb links={links} color="gold" />
            <Background color="gold" />
            <BadgesFormFeature />
        </Container>
    );
};

export default BadgesHome;
