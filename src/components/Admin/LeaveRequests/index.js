import { Component } from 'react';

import IndexPage from '../IndexPage';
import IndexLink from '../IndexLink';
import { ReactComponent as View } from '../../../images/Admin/Leave/ViewLeave.svg';
import { ReactComponent as Create } from '../../../images/Admin/Leave/CreateLeave.svg';
import { ReactComponent as Manage } from '../../../images/Admin/Leave/ManageLeave.svg';
import { LayoutContext } from '../../../LayoutContext';

class index extends Component {
    render() {
        const links = [{ title: 'Leave Requests', to: '/leave-request' }];
        let value = this.context;
        const {
            roles: { super_admin },
        } = value;

        return (
            <IndexPage title="Leave Requests" links={links} color="light-blue">
                <IndexLink
                    color="pink"
                    title="Create Leave Request"
                    description="Create new leave requests."
                    to={`${process.env.PUBLIC_URL}/leave-request/request-leave`}
                >
                    <Create />
                </IndexLink>
                <IndexLink
                    color="purple"
                    title="View Leave Requests"
                    description="View and manage your leave requests."
                    to={`${process.env.PUBLIC_URL}/leave-request/view-leave`}
                >
                    <View />
                </IndexLink>
                {super_admin && 
                    <IndexLink
                        color="blue"
                        title="Manage Leave Request"
                        description="Approve or deny leave requests."
                        to={`${process.env.PUBLIC_URL}/leave-request/admin-leave`}
                    >
                        <Manage />
                    </IndexLink>
                }
            </IndexPage>
        );
    }
}

export default index;

index.contextType = LayoutContext;