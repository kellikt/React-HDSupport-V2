import React from 'react';

import HolidayWizard from './HolidayWizard';
import Breadcrumb from '../../Breadcrumb';
import Container from '../../Container';
import Background from '../../../Background';

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
            <Background color="blue" yOffset={70} />
        </Container>
    );
};

export default Index;
