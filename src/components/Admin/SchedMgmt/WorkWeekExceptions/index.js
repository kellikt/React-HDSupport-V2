import React from 'react';
import styled from 'styled-components';

import WorkWeekWizard from './WorkWeekWizard';
import Breadcrumb from '../../Breadcrumb';

const Index = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Work Week Exceptions', to: '/schedmgmt/wwexception' },
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

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;
