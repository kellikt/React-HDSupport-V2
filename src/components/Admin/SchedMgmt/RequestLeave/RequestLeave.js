import React from 'react';

import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';
import RequestLeaveForm from './RequestLeaveForm';

const RequestLeave = () => {
    const links = [
        { title: 'Leave Request', to: '/leave-request' },
        { title: 'Request Leave', to: '/leave-request/request-leave' },
    ];

    return (
        <Container>
            <h1>Request Leave</h1>
            <Breadcrumb links={links} color="pink" />
            <RequestLeaveForm />
            <Background color="bpink" />
        </Container>
    );
};

export default RequestLeave;
