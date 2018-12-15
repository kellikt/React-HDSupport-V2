import React, { Component } from 'react';
import { LayoutContext } from '../LayoutContext';
import Main from './Main/Main';
import NoAuth from './NoAuth';

class AdminRoute extends Component {
    render() {
        let { as: Comp, ...props } = this.props;
        let value = this.context;
        const {
            roles: { manager, admin },
            isExpired,
        } = value;

        if (isExpired) {
            return <NoAuth />;
        } else if ((admin || manager) && !isExpired) {
            return <Comp {...props} />;
        } else {
            return <Main />;
        }
    }
}

AdminRoute.contextType = LayoutContext;

export default AdminRoute;
