import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';

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
            let value = this.context;
            const { username } = value;

            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                badge: '',
                user: username
            });

            const data = request.data;
            if(!(data === 0 || data === '')) {
                this.setState({
                    badges: data,
                });
            }
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    render() {
      const { badges } = this.state;

      return (
        <BadgeDiv>
            {badges.map((item) => {
                return (
                    <BadgeCard bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={true} handleFavorite={this.handleFavorite} />
                );
            })}
        </BadgeDiv>
      );
    }
}

BadgeContainer.contextType = LayoutContext;

export default BadgeContainer;

const BadgeDiv = styled.div`
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2em;
    display: grid;
`;
