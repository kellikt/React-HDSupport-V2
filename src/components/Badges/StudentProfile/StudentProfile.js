import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

import { LayoutContext } from '../../../LayoutContext';

import BadgesFormFeature from './BadgesFormFeature';
import BadgeContainer from '../YourBadges/BadgeContainer';

class StudentProfile extends Component {
    state = {
        user: {},
        badges: [],
        favorites: [],
    }

    async componentDidMount() {
        const { username } = this.props;
        try {
                const user = axios.post(`${process.env.REACT_APP_DB_SERVER}/search-user.php`, {
                    username: username,
                    uuid: '',
                    firstName: '',
                    lastName: '',
                });
                const badges = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: username
                });
                const responses = await Promise.all([user, badges]);
                this.setState({
                    user: responses[0].data[0],
                    badges: responses[1].data,
                });
            } catch(error) {
                console.log(error);
        }
    }

    render() {
        const { user, badges } = this.state;
        const { username } = this.props;
        console.log(user.username);
        const links = [
            { title: 'Badges', to: '/badges/'},
            { title: `${user.username}`, to: `/badges/${user.username}/`}
        ];

        return (
          <Container>
                <h1>{user.first_name} {user.last_name}</h1>
                <Breadcrumb links={links} color="dark-grey" />
                <Background color="grey" />
                {badges.filter((badge) => badge.fav == 1).length > 0 ?
                    <BadgesFormFeature username={username} firstName={user.first_name} />
                : ''}
                <BadgeContainer profile={false} list={false} username={username}/>
          </Container>    
        );
    }
}

StudentProfile.contextType = LayoutContext;
StudentProfile.propTypes = {
    username: PropTypes.string
}

export default StudentProfile;
