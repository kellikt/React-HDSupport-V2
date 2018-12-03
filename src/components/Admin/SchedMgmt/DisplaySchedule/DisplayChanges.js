import React from 'react';
import styled from 'styled-components';

import DisplayChangesForm from './DisplayChangesForm';
import Breadcrumb from '../../Breadcrumb';

const DisplayChanges = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Display Changes', to: '/schedmgmt/displaychanges' },
    ];

    return (
        <Container>
            <h1>Display Schedule Changes</h1>
            <Breadcrumb links={links} color="gold" />
            <DisplayChangesForm />
        </Container>
    );
};

export default DisplayChanges;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;
