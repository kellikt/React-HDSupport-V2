import React from 'react';

import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';

import AdminViewLeaveForm from './AdminViewLeaveForm';

const AdminViewLeave = () => {
    const links = [
        { title: 'Leave Request', to: '/leave-request' },
        { title: 'View Leave Requests', to: '/leave-request/admin-view-leave' },
    ];

    return (
        <Container>
            <h1>View Leave Requests Admin</h1>
            <Breadcrumb links={links} color="blue" />
            <Background color="blue" />
            <AdminViewLeaveForm />
        </Container>
    );
};

export default AdminViewLeave;
