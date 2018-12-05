import React from 'react';
import styled from 'styled-components';

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

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;
