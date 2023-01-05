import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';

import { LayoutContext } from '../../../LayoutContext';
import BadgeIcon from './BadgeIcon';

import { Inputs } from '../AddBadge/AddBadgeComponents';
import { ReactComponent as Desktop } from '../../../images/Admin/Badges/BadgesDesktopForm.svg';
import { ReactComponent as Lightbulb } from '../../../images/Admin/Badges/BadgesLightbulbForm.svg';

class BadgeIconContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [],
            selectedView: 'all',
            userBadges: [],
        }
    }

    handleFavorite = async (bid, fav) => {
        let value = this.context;
        const { username } = value;
        const changedFavorite = fav === 0 ? 1 : 0;
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-badge-favorite.php`, {
                username: username,
                bid: bid,
                fav: changedFavorite
            });
            this.getBadges();
        } catch (error) {
            console.log(error.message);
        }
    }

    getBadges = async() => {
        try {
          let value = this.context;
          const { username } = value;

          const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
              badge: '',
              user: username
          });

          const data = request.data;
          this.setState({
              userBadges: data,
              favoriteBadges: data.filter((badge) => badge.fav == 1)
          });
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
        });
    }

    async componentDidMount() {
        try {
            this.getBadges();
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badges.php`, {
                name: '',
            });

            const data = request.data;

            this.setState({
                badges: data,
            })

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { badges, userBadges, selectedView } = this.state;

        return (
            <div>
                <ViewForm>
                        <Title>
                            <h2>Your Badges</h2>
                            <p>View and manage your badge collection.</p>
                        </Title>
                        <Desktop />
                        <Lightbulb />
                        <StyledInputs>
                            <label htmlFor="badges">Badge View</label>
                            <select name="selectedView" id="badges" onChange={this.handleChange} value={selectedView}>
                                <option value="all">All Badges</option>
                                <option value="unlocked">Unlocked Badges</option>
                                <option value="locked">Locked Badges</option>
                                <option value="favorite">Favorite Badges</option>
                            </select>
                        </StyledInputs>
                </ViewForm>
                {selectedView == "all" ?
                    <BadgeContainer>
                        {badges.map((item) => {
                            if (userBadges.some((badge) => badge.bid === item.bid)) {
                                const badge = userBadges.find((badge) => badge.bid === item.bid);
                                return (
                                    <BadgeIcon key={item.bid} bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={badge.tstamp} notes={badge.notes} staffUsername={badge.staff_username} user={item.first_name} fav={badge.fav} locked={false} handleFavorite={this.handleFavorite} />
                                );
                            } else {
                                return (
                                <BadgeIcon key={item.bid} bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} user={item.first_name} locked={true} handleFavorite={this.handleFavorite} />
                                );
                            }
                        })}
                    </BadgeContainer>
                :  ''}
                {selectedView == "unlocked" ?
                    <BadgeContainer>
                        {badges.map((item) => {
                            if (userBadges.some((badge) => badge.bid === item.bid)) {
                                const badge = userBadges.find((badge) => badge.bid === item.bid);
                                return (
                                    <BadgeIcon key={item.bid} bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={badge.tstamp} notes={badge.notes} staffUsername={badge.staff_username} user={item.first_name} fav={badge.fav} locked={false} handleFavorite={this.handleFavorite} />
                                );
                            }
                        })}
                    </BadgeContainer>
                :  ''}
                {selectedView == "locked" ?
                    <BadgeContainer>
                        {badges.map((item) => {
                            if (!userBadges.some((badge) => badge.bid === item.bid)) {
                                return (
                                    <BadgeIcon key={item.bid} bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} user={item.first_name} locked={true} handleFavorite={this.handleFavorite} />
                                );
                            }
                        })}
                    </BadgeContainer>
                :  ''}
                {selectedView == "favorite" ?
                    <BadgeContainer>
                        {badges.map((item) => {
                            if (userBadges.some((badge) => badge.bid === item.bid && badge.fav == 1)) {
                                const badge = userBadges.find((badge) => badge.bid === item.bid);
                                return (
                                    <BadgeIcon key={item.bid} bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={badge.tstamp} notes={badge.notes} staffUsername={badge.staff_username} user={item.first_name} fav={badge.fav} locked={false} handleFavorite={this.handleFavorite} />
                                );
                            }
                        })}
                    </BadgeContainer>
                :  ''}
            </div>
        );
    }
}

BadgeIconContainer.contextType = LayoutContext;

export default BadgeIconContainer;

const BadgeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 100px;
    margin: 50px 20px 20px 20px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (max-width: 950px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 1/4;

    h2 {
      font-size: 28px;
      margin: 0 0 4px;
      color: #000;
      grid-column: 1;
    }

    p {
        margin: 0;
        color: var(--dark-grey);
        grid-column: 1;
    }

`;

const ViewForm = styled.div`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 18px;
    align-items: center;

    > svg {
        width: 14em;
        height: auto;
        margin-left: 25%;

        @media (max-width: 1064px) {
            display: none;
        }
    }

    @media (max-width: 1064px) {
        grid-template-columns: 1fr
    }

`;

const StyledInputs = styled(Inputs)`
    margin-top: 2em;
`;