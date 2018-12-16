import React from 'react';

import Container from '../../Container';
import DisplayChangesForm from './DisplayChangesForm';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';

const DisplayChanges = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Display Changes', to: '/schedmgmt/displaychanges' },
    ];

    return (
        <Container>
            <h1>Display Schedule Changes</h1>
            <Breadcrumb links={links} color="gold" />
            <DisplayChangesForm />
            <Background color="gold" />
        </Container>
    );
};

export default DisplayChanges;
