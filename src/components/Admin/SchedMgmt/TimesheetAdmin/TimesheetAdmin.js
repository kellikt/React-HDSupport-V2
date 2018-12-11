import React from 'react';

import Container from '../../Container';
import AdminForm from './AdminForm';
import Breadcrumb from '../../Breadcrumb';

const TimesheetAdmin = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Timesheet Admin', to: '/schedmgmt/tsadmin' },
    ];

    return (
        <Container>
            <h1>Timesheet Admin</h1>
            <Breadcrumb links={links} color="green" />
            <AdminForm />
        </Container>
    );
};

export default TimesheetAdmin;
