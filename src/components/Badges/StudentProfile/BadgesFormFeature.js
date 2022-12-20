import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { FormEl } from '../DisplayBadges/DisplayBadgesComponents';
import { ReactComponent as FeatureIcon } from '../../../images/Admin/Badges/Icons/feature.svg';
import Button from '../../Button';
import Badge from './Badge';

class BadgesFormFeature extends Component {

    state = {
        favorites: [],
    }

    async componentDidMount() {
        try {
            const { username } = this.props;
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                badge: '',
                user: username
            });
            const data = request.data;
            console.log(data);
            if (!(data.length === 0)) {
                this.setState({
                    favorites: data.filter((fav) => fav.fav == 1)
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { favorites } = this.state;
        const { firstName } = this.props;
        
        return (
            <React.Fragment>
                <BadgeForm>
                    <FeatureLabel><StyledFeatureIcon /><p>{firstName}'s Featured Badges</p></FeatureLabel>
                    <FeatureCase>
                        {favorites.map((favorite) => {
                            return (
                                <Badge title={favorite.title} image={favorite.link} color={favorite.hex} secondaryColor={favorite.hex_secondary} description={favorite.description} timestamp={favorite.tstamp} />
                            )
                        })}
                    </FeatureCase>
                </BadgeForm>
            </React.Fragment>
        );
    }

}

BadgesFormFeature.propTypes = {
    username: PropTypes.string,
    firstName: PropTypes.string,
}
export default BadgesFormFeature;

const FeatureCase = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }

`;

const FeatureLabel = styled.div`
    width: 25em;
    position: relative;
    top: -4em;
    left: -1em;
    margin-right: 48em;
    display: flex;
    background-color: #626471
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.3), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 0.5em;
    p {
      color: white;
      font-size: 1.8em;
      margin-top: 0.2em;
      padding: 0.5em 0.9em 0.5em 0.5em;
    }


`;

const StyledFeatureIcon = styled(FeatureIcon)`
    margin-left: 1em;
    margin-top: 1em;
`;

const BadgeForm = styled.div`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 5em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, 5em);
    grid-column-gap: 18px;
    align-items: center;

    > svg {
        width: 100%;
        height: auto;

        @media (max-width: 900px) {
            display: none;
        }
    }

    @media (max-width: 1020px) {
        grid-template-rows: repeat(4, 5em);
    }
`;
