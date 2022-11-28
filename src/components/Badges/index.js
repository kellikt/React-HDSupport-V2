import React from 'react';

import IndexPage from '../Admin/IndexPage';
import IndexLink from '../Admin/IndexLink';
import { ReactComponent as AddBadge } from '../../images/Admin/Badges/AddBadgeIndex.svg';
import { ReactComponent as EditBadge } from '../../images/Admin/Badges/EditBadgeIndex.svg';
import { ReactComponent as AddStudentBadge } from '../../images/Admin/Badges/AddStudentBadgeIndex.svg';
import { ReactComponent as EditStudentBadge } from '../../images/Admin/Badges/EditStudentBadgeIndex.svg';
import Background from '../Background';

const index = () => {
    const links = [{ title: 'Badges Management', to: '/badgemgmt' }];

    return (
        <IndexPage title="Badges Management" links={links}>
            <IndexLink
                color="pink"
                title="Add Badges"
                description="Add badges to HDSupport."
                to={`${process.env.PUBLIC_URL}/badgemgmt/addbadge`}
            >
                <AddBadge />
            </IndexLink>
            <IndexLink
                color="purple"
                title="Edit Badges"
                description="Edit or remove badges from HDSupport."
                to={`${process.env.PUBLIC_URL}/badgemgmt/displaybadges`}
            >
                <EditBadge />
            </IndexLink>
            <IndexLink
                color="light-blue"
                title="Add Student Badges"
                description="Add a new badge to a student's profile."
                to={`${process.env.PUBLIC_URL}/badgemgmt/studentbadge`}
            >
                <AddStudentBadge />
            </IndexLink>
            <IndexLink
                color="dark-blue"
                title="Manage Student Badges"
                description="Edit or remove a badge from a student."
                to={`${process.env.PUBLIC_URL}/badgemgmt/managebadge`}
            >
                <EditStudentBadge />
            </IndexLink>
            <Background color="blue" yOffset={70} />
        </IndexPage>
    );
};

export default index;
