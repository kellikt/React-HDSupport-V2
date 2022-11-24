import React from 'react';
import Container from '../../Admin/Container';

import AddForm from './AddForm';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

const AddBadge = () => {
    const links = [
        { title: 'Badges Management', to: '/badgemgmt' },
        { title: 'Add Badge', to: '/badgemgmt/addbadge' },
    ];

    return (
        <Container>
            <h1>Add Badge</h1>
            <Breadcrumb links={links} color="pink" />
            <AddForm />
            <Background color="purple" />
        </Container>
    );
};

export default AddBadge;
