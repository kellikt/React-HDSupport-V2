import React from 'react';

import WorkWeekWizard from './WorkWeekWizard';
import Breadcrumb from '../../Breadcrumb';
import Container from '../../Container';

const Index = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Work Week Exceptions', to: '/schedmgmt/wwexceptions' },
    ];

    return (
        <Container>
            <h1>Work Week Exceptions</h1>
            <Breadcrumb links={links} color="red" />
            <WorkWeekWizard />
        </Container>
    );
};

export default Index;
