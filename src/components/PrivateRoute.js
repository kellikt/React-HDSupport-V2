import React, { Component } from 'react';
import { LayoutContext } from '../LayoutContext';
import Main from './Main/Main';

class PrivateRoute extends Component {
    render() {
        let { as: Comp, ...props } = this.props;
        let value = this.context;
        const {
            roles: { manager, admin },
        } = value;

        return manager ? <Comp {...props} /> : admin ? <Comp {...props} /> : <Main />;
    }
}

PrivateRoute.contextType = LayoutContext;

export default PrivateRoute;
