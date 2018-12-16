import React from 'react';

import Container from '../../Container';
import MetricsForm from './MetricsForm';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';

const ClockMetrics = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Clock Metrics', to: '/schedmgmt/clockmetrics' },
    ];

    return (
        <Container>
            <h1>Clock-in Metrics</h1>
            <Breadcrumb links={links} color="light-blue" />
            <MetricsForm />
            <Background />
        </Container>
    );
};

export default ClockMetrics;
