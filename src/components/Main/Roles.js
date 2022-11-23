import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { LayoutContext } from '../../LayoutContext';

class Roles extends PureComponent {
    createRoleText = () => {
        let value = this.context;
        const { roles } = value;
        let text = '';

        // primary role
        if (roles.staff) text = 'You are Staff';
        else if (roles.lab) {
            if (roles.helpDesk) {
                text = 'You are a Lab Monitor and a Help Desk Consultant';
            } else if (roles.leapStart) {
                text = 'You are a Lab Monitor and a Leap Start Participant';
            } else {
                text = 'You are a Lab Monitor';
            }
        } else if (roles.helpDesk) {
            if (roles.tech) {
                text = 'You are a Technician';
            } else if (roles.leapStart) {
                text = 'You are a Help Desk Consultant and a Leap Start Participant'
            } else {
                text = 'You are a Help Desk Consultant';
            }
        } else if (roles.leapStart) {
            text = 'You are a Leap Start Participant';
        }

        // admin roles
        if (roles.admin === false && roles.manager === false) text += ' and you have no administrative roles.';
        else if (roles.admin && roles.manager === false) text += ' and a site Administrator.';
        else if (roles.admin === false && roles.manager) text += ' and a Lab/Help Desk Manager.';
        else if (roles.admin && roles.manager) text += ' and an Administrator and a Lab/Help Desk Manager.';

        return text;
    };

    render() {
        const text = this.createRoleText();

        return <RolesEl>{text}</RolesEl>;
    }
}

Roles.contextType = LayoutContext;
export default Roles;

const RolesEl = styled.h2`
    font-weight: 300;
    color: #3e87cf;
    max-width: 30ch;
    font-size: 34px;
    margin: 0;
`;
