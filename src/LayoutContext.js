import React, { Component } from 'react';
import axios from 'axios';

export const LayoutContext = React.createContext();

export class LayoutProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: '',
            username: '',
            firstName: '',
            fullScreen: false,
            isExpired: false,
            loaded: false,
            roles: {},
        };
    }

    changeSize = () => {
        this.setState(prevState => {
            return { fullScreen: !prevState.fullScreen };
        });
    };

    async componentDidMount() {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-session-variables.php`);
            const data = request.data;

            const nameRequest = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-name.php?uuid=${data.uuid}`);
            const rolesRequest = axios.get(
                `${process.env.REACT_APP_DB_SERVER}/get-roles.php?username=${data.username}`
            );

            const userData = await Promise.all([nameRequest, rolesRequest]);
            const nameData = userData[0].data;
            const rolesData = userData[1].data;

            const roles = {
                helpDesk: rolesData.helpdesk === 'yes' ? true : false,
                lab: rolesData.lab === 'yes' ? true : false,
                tech: rolesData.tech === 'yes' ? true : false,
                staff: rolesData.staff === 'yes' ? true : false,
                admin: rolesData.administrator === 'yes' ? true : false,
                manager: rolesData.manager === 'yes' ? true : false,
            };

            this.setState({
                uuid: data.uuid,
                username: data.username,
                roles: roles,
                firstName: nameData.first_name,
                isExpired: nameData.expired === 1 ? true : false,
                loaded: true,
            });

            this.refreshID = setInterval(() => {
                window.location.reload();
            }, 480000);
        } catch (error) {
            console.log(`Unable: ${error}`);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { children } = this.props;

        return (
            <LayoutContext.Provider
                value={{
                    fullScreen: this.state.fullScreen,
                    uuid: this.state.uuid,
                    username: this.state.username,
                    changeSize: this.changeSize,
                    loaded: this.state.loaded,
                    roles: this.state.roles,
                    isExpired: this.state.isExpired,
                    firstName: this.state.firstName,
                }}
            >
                {children}
            </LayoutContext.Provider>
        );
    }
}

export const LayoutConsumer = LayoutContext.Consumer;
