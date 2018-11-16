import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RolesEl = styled.h2`
    font-weight: 300;
    color: #3e87cf;
    max-width: 30ch;
    font-size: 34px;
    margin: 0;
`;

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: {},
        };
    }

    async componentDidMount() {
        const nameRequest = await axios.get(`/get-username.php?uuid=22051104`);
        const nameData = await nameRequest.data;

        const rolesRequest = await axios.get(
            `/get-roles.php?username=${nameData.username}`
        );
        const rolesData = await rolesRequest.data;

        const roles = {
            helpDesk: rolesData.helpdesk === 'yes' ? true : false,
            lab: rolesData.lab === 'yes' ? true : false,
            tech: rolesData.tech === 'yes' ? true : false,
            staff: rolesData.staff === 'yes' ? true : false,
            admin: rolesData.administrator === 'yes' ? true : false,
            manager: rolesData.manager === 'yes' ? true : false,
        };

        this.setState({
            roles: roles,
        });
    }

    createRoleText = () => {
        const { roles } = this.state;
        let text = '';

        // primary role
        if (roles.staff) text = 'You are Staff';
        else if (roles.lab) {
            if (roles.helpDesk) {
                text = 'You are a Lab Monitor and a Help Desk Consultant';
            } else text = 'You are a Lab Monitor';
        } else if (roles.helpDesk) {
            if (roles.tech) text = 'You are a Technician';
            else text = 'You are a Help Desk Consultant';
        }

        // admin roles
        if (roles.admin === false && roles.manager === false)
            text += ' and you have no administrative roles.';
        else if (roles.admin && roles.manager === false)
            text += ' and a site Administrator.';
        else if (roles.admin === false && roles.manager)
            text += ' and a Lab/Help Desk Manager.';
        else if (roles.admin && roles.manager)
            text += ' and an Administrator and a Lab/Help Desk Manager.';

        return text;
    };

    render() {
        const text = this.createRoleText();

        return <RolesEl>{text}</RolesEl>;
    }
}

export default Roles;
