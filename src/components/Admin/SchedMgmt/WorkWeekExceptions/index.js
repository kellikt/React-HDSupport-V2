import React from 'react';

import WorkWeekWizard from './WorkWeekWizard';
import Breadcrumb from '../../Breadcrumb';
import Container from '../../Container';
import Background from '../../../Background';

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
            <Background color="purple" />
        </Container>
    );
};

export default Index;
