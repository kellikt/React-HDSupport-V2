import React from 'react';

import HolidayWizard from './HolidayWizard';
import Breadcrumb from '../../Breadcrumb';
import Container from '../../Container';

const Index = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Holiday Wizard', to: '/schedmgmt/holiday' },
    ];

    return (
        <Container>
            <h1>Holiday Wizard</h1>
            <Breadcrumb links={links} color="blue" />
            <HolidayWizard />
        </Container>
    );
};

export default Index;
