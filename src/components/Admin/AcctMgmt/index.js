import React from 'react';

import IndexPage from '../IndexPage';
import IndexLink from '../IndexLink';
import { ReactComponent as AddUser } from '../../../images/Admin/Acct/AddUser.svg';
import { ReactComponent as EditUser } from '../../../images/Admin/Acct/EditUser.svg';

const index = () => {
    const links = [{ title: 'Account Management', to: '/acctmgmt' }];

    return (
        <IndexPage title="Account Management" links={links}>
            <IndexLink
                color="green"
                title="Add New User"
                description="Create a new user for HDSupport"
                to={`${process.env.PUBLIC_URL}/acctmgmt/adduser`}
            >
                <AddUser />
            </IndexLink>
            <IndexLink
                color="purple"
                title="Edit User"
                description="Edit an existing user's record/permissions."
                to={`${process.env.PUBLIC_URL}/acctmgmt/edituser`}
            >
                <EditUser />
            </IndexLink>
        </IndexPage>
    );
};

export default index;
