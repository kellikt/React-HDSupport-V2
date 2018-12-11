import React from 'react';
import Container from '../../Container';

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
