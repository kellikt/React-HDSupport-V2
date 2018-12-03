import React from 'react';
import styled from 'styled-components';

import MetricsForm from './MetricsForm';
import Breadcrumb from '../../Breadcrumb';

const ClockMetrics = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Clock Metrics', to: '/schedmgmt/clockmetrics' },
    ];

    return (
        <Container>
            <h1>Clock-in Metrics</h1>
            <Breadcrumb links={links} color="lightblue" />
            <MetricsForm />
        </Container>
    );
};

export default ClockMetrics;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 15px;
        grid-column: 1/-1;
        font-weight: 600;
        font-size: 34px;
    }
`;
