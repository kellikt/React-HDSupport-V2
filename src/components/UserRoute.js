import { Component } from 'react';
import { LayoutContext } from '../LayoutContext';
import NoAuth from './NoAuth';

class UserRoute extends Component {
    render() {
        let { as: Comp, ...props } = this.props;
        let value = this.context;
        const { isExpired } = value;

        return !isExpired ? <Comp {...props} /> : <NoAuth />;
    }
}

UserRoute.contextType = LayoutContext;

export default UserRoute;
