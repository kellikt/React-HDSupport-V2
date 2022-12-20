import React from 'react';
import styled from 'styled-components';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

import BadgeContainer from './BadgeContainer';

const YourBadges = () => {

    const links = [
        { title: 'Badges', to: '/badges/'},
        { title: 'Your Badges', to: '/your-badges/'}
    ];

    return (
        <Container>
            <h1>Your Badges</h1>
            <Breadcrumb links={links} color="dark-grey" />
            <Background color="grey" />
            <BadgeContainer profile={false} list={true}/>
        </Container>    
    );
};

export default YourBadges;
