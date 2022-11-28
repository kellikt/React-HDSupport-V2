import React from 'react';

import Container from '../../Admin/Container';
import ManageBadgesForm from './ManageBadgesForm';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

const ManageStudentBadges = () => {
    const links = [
        { title: 'Badges Management', to: '/badgemgmt' },
        { title: 'Manage Student Badges', to: '/badgemgmt/managebadge' },
    ];

    return (
        <Container>
            <h1>Manage Student Badges</h1>
            <Breadcrumb links={links} color="dark-blue" />
            <ManageBadgesForm />
            <Background color="blue" />
        </Container>
    );
};

export default ManageStudentBadges;
