import React from 'react';
import styled from 'styled-components';
import ChangeForm from './ChangeForm';

import Breadcrumb from '../../Breadcrumb';

const ScheduleChange = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Schedule Change', to: '/schedmgmt/schedchange' },
    ];

    return (
        <Container>
            <h1>Schedule Change</h1>
            <Breadcrumb links={links} color="purple" />
            <ChangeForm />
        </Container>
    );
};

export default ScheduleChange;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 15px;
        grid-column: 1/-1;
        font-weight: 600;
        font-size: 34px;
    }
`;
