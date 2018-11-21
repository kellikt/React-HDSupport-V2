import React from 'react';
import styled from 'styled-components';

import Form from './Form';
import Breadcrumb from '../Breadcrumb';

const EditUser = () => {
    const links = [
        { title: 'Account Management', to: '/acctmgmt' },
        { title: 'Edit User', to: '/acctmgmt/edituser' },
    ];

    return (
        <Container>
            <h1>Search User</h1>
            <Breadcrumb links={links} color="purple" />
            <Form />
        </Container>
    );
};

export default EditUser;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 15px;
        grid-column: 1/-1;
        font-weight: 600;
        font-size: 34px;
    }
`;
