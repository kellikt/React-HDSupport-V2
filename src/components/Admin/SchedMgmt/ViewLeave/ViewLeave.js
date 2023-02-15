import React from 'react';

import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';
import ViewLeaveForm from './ViewLeaveForm';

const ViewLeave = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'View Leave Requests', to: '/schedmgmt/view-leave' },
    ];

    return (
        <Container>
            <h1>View Leave Requests</h1>
            <Breadcrumb links={links} color="blue" />
            <Background color="blue" />
            <ViewLeaveForm />
        </Container>
    );
};

export default ViewLeave;
