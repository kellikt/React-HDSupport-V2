import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { ReactComponent as FeatureIcon } from '../../../images/Admin/Badges/Icons/feature.svg';
import Badge from './Badge';

class BadgesFormFeature extends Component {

    state = {
        favorites: [],
    }

    calculateRegBadgeHeight() {
        const { favorites } = this.state;
        return (Math.ceil(favorites.length / 3)) * 31;
    }

    calculateSmallBadgeHeight() {
        const { favorites } = this.state;
        return (Math.ceil(favorites.length / 3)) * 15;
    }

    calculateOneColumnHeight() {
        const { favorites } = this.state;
        return favorites.length * 15;
    }

    async componentDidMount() {
        try {
            const { username } = this.props;
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                badge: '',
                user: username
            });
            const data = request.data;
            if (!(data.length === 0)) {
                this.setState({
                    favorites: data.filter((fav) => fav.fav === 1)
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
                    <FeatureCase bigHeight={this.calculateRegBadgeHeight()} smallHeight={this.calculateSmallBadgeHeight()} columnHeight={this.calculateOneColumnHeight()}>
                        {favorites.map((favorite) => {
                            return (
                                <Badge title={favorite.title} image={favorite.link} color={favorite.hex} secondaryColor={favorite.hex_secondary} description={favorite.description} timestamp={favorite.tstamp} notes={favorite.notes} staffUsername={favorite.staff_username}/>
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
    grid-row-gap: 4em;
    height: ${props => (props.bigHeight) || 0}em

    @media (max-width: 1200px) and (min-width: 700px) {
      height: ${props => (props.smallHeight) || 0}em
      grid-row-gap: 0em;
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        height: ${props => (props.columnHeight) || 0}em
        grid-row-gap: 0em;
    }

`;

const FeatureLabel = styled.div`
    width: 26em;
    position: absolute;
    top: -3em;
    left: 1em;
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

    @media (max-width: 1200px) {
      left: 2em;
    }

    @media (max-width: 523px) {
      left: 0em;
      width: 100%;
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
    display: block;
    position: relative;
    align-items: center;

    > svg {
        width: 100%;
        height: auto;

        @media (max-width: 900px) {
            display: none;
        }
    }

    @media (max-width: 1200px) {
        grid-template-rows: repeat(5, 5em);
    }
`;
