import React from 'react';

import Container from '../../Admin/Container';
import BadgeForm from './BadgeForm';
import Breadcrumb from '../../Admin/Breadcrumb';


const StudentBadge = () => {
    const links = [
      { title: 'Badges Management', to: '/badgemgmt' },
      { title: 'Add Student Badge', to: '/badgemgmt/studentbadge' },
    ];

    return (
        <Container>
            <h1>Add Student Badge</h1>
            <Breadcrumb links={links} color="light-blue" />
            <BadgeForm />
        </Container>
    );
};

export default StudentBadge;
