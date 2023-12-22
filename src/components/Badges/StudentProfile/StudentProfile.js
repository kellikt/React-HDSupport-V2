import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    useParams
} from 'react-router-dom';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';

import { LayoutContext } from '../../../LayoutContext';

import BadgesFormFeature from './BadgesFormFeature';
import BadgeContainer from '../YourBadges/BadgeContainer';

function StudentProfile() {
    const { username } = useParams();
    const [state, setState] = useState({
        user: {},
        badges: [],
        favorites: [],
    });

    const getProfileInfo = async() => {
        try {
            const user = axios.post(`${process.env.REACT_APP_DB_SERVER}/search-user.php`, {
                username: username,
                uuid: '',
                firstName: '',
                lastName: '',
                enabled: false,
            });
            const badges = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                badge: '',
                user: username,
            });
            const responses = await Promise.all([user, badges]);
            setState({
                ...state,
                user: responses[0].data[0],
                badges: responses[1].data,
            });
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        getProfileInfo();
    }, []);

    const links = [
        { title: 'Badges', to: '/badges/' },
        { title: `${state.user.username}`, to: `/badges/${state.user.username}/` },
    ];

    return (
        <Container>
            <h1>
                {state.user.first_name} {state.user.last_name}
            </h1>
            <Breadcrumb links={links} color="dark-grey" />
            <Background color="grey" />
            {state.badges.filter((badge) => badge.fav === 1).length > 0 ? (
                <BadgesFormFeature username={username} firstName={state.user.first_name} />
            ) : (
                ''
            )}
            <BadgeContainer profile={false} list={false} username={username} />
        </Container>
    );
}

export default StudentProfile;
