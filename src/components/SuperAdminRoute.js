import { Component } from 'react';
import { LayoutContext } from '../LayoutContext';
import Main from './Main/Main';
import NoAuth from './NoAuth';

class SuperAdminRoute extends Component {
    render() {
        let { as: Comp, ...props } = this.props;
        let value = this.context;
        const {
            roles: { super_admin },
            isExpired,
        } = value;

        if (isExpired) {
            return <NoAuth />;
        } else if (super_admin && !isExpired) {
            return <Comp {...props} />;
        } else {
            return <Main />;
        } 
    }
}

SuperAdminRoute.contextType = LayoutContext;

export default SuperAdminRoute;
