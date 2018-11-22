import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
        };
    }

    async componentDidMount() {
        const { username } = this.props;

        const rolesRequest = axios.get(`/get-roles.php?username=${username}`);
        const infoRequest = axios.post(`/search-user.php`, {
            username: username,
            uuid: '',
            firstName: '',
            lastName: '',
        });

        const response = await Promise.all([rolesRequest, infoRequest]);
        const data = await Promise.all([response[0].data, response[1].data]);

        this.setState({
            userData: data,
        });
    }

    render() {
        return <div>{this.props.username}</div>;
    }
}

export default Edit;
