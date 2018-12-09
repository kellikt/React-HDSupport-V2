import React from 'react';
import styled from 'styled-components';

import HolidayWizard from './HolidayWizard';
import Breadcrumb from '../../Breadcrumb';

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

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;
