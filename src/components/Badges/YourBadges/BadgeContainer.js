import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LayoutContext } from '../../../LayoutContext';

import BadgeCard from '../BadgesHome/BadgeCard';

class BadgeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [],
        }
    }

    handleFavorite = async (bid, fav, setFavorite) => {
        try {
            let value = this.context;
            const { username } = value;
            const changedFavorite = fav == 0 ? 1 : 0;
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-badge-favorite.php`, {
                username: username,
                bid: bid,
                fav: changedFavorite
            });
            setFavorite(fav);
        } catch (error) {
            console.log(error.message);
        }
    }

    async componentDidMount() {
        try {

            const { profile } = this.props;

            if (profile) {
                let value = this.context;
                const { username } = value;
                console.log(username);
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: username
                });
    
                const data = request.data;
                if(!(data.length === 0 || data === '')) {
                    this.setState({
                        badges: data,
                    });
                }
            } else {
                const { username } = this.props;
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: username
                });
    
                const data = request.data;
                if(!(data.length === 0 || data === '')) {
                    this.setState({
                        badges: data,
                    });
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
      const { badges } = this.state;
      const { profile } = this.props;

        return (
            <BadgeDiv>
                {badges.map((item) => {
                    return (
                        <BadgeCard bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={profile} handleFavorite={this.handleFavorite} />
                    );
                })}
            </BadgeDiv>
        );
    }
}

BadgeContainer.contextType = LayoutContext;
BadgeContainer.propTypes = {
    profile: PropTypes.bool,
    username: PropTypes.string,
}

export default BadgeContainer;

const BadgeDiv = styled.div`
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2em;
    display: grid;

    @media (max-width: 1199px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 5em;
    }

    @media (max-width: 1199px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 5em;
    }

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
    }
`;
