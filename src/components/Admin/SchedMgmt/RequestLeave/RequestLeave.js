import React from 'react';

import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';
import RequestLeaveForm from './RequestLeaveForm';

const RequestLeave = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Request Leave', to: '/schedmgmt/requestleave' },
    ];

    return (
        <Container>
            <h1>Request Leave</h1>
            <Breadcrumb links={links} color="blue" />
            <RequestLeaveForm />
            <Background color="blue" />
        </Container>
    );
};

export default RequestLeave;
