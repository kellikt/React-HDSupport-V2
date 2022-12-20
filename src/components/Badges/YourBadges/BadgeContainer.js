import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LayoutContext } from '../../../LayoutContext';
import Button from '../../Button';

import BadgeCard from '../BadgesHome/BadgeCard';

class BadgeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [],
            userBadges: [],
            allBadges: true,
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

    handleClick = event => {
        this.setState({
            allBadges: !this.state.allBadges
        });
    }

    async componentDidMount() {
        try {

            const { profile, list } = this.props;

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
            } else if (list) {
                    let value = this.context;
                    const { username } = value;
                    const badges = axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badges.php`, {
                        name: '',
                    });

                    const userBadges = axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                        badge: '',
                        user: username
                    });

                    const data = await Promise.all([badges, userBadges]);
                    this.setState({
                        badges: data[0].data,
                        userBadges: data[1].data,
                    });
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
      const { badges, userBadges, allBadges } = this.state;
      const { profile, list } = this.props;

        if (list) {
            return (
                <div>
                    {allBadges ? 
                    <div>
                        <BadgeButton color="dark-grey" onClick={this.handleClick}>View only unlocked badges</BadgeButton>
                        <BadgeDiv>
                            {badges.map((item) => {
                                if (userBadges.some((badge) => badge.bid == item.bid)) {
                                    const badge = userBadges.find((badge) => badge.bid == item.bid);
                                    return (
                                        <BadgeCard bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={badge.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={true} locked={false} handleFavorite={this.handleFavorite} />
                                    );
                                } else {
                                    return (
                                        <BadgeCard bid={item.bid} title={item.title} color="#000000" secondaryColor="#000000" image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={false} locked={true} handleFavorite={this.handleFavorite} />
                                    );
                                }
                            })}
                        </BadgeDiv>
                    </div>
                    :
                    <div>
                        <BadgeButton color="dark-grey" onClick={this.handleClick}>View all badges</BadgeButton>
                        <BadgeDiv>
                            {userBadges.map((item) => {
                                return <BadgeCard bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={profile} locked={false} handleFavorite={this.handleFavorite} />
                            })}
                        </BadgeDiv>
                    </div>
                    }
                </div>
            );
        } else {
            return (
                <BadgeDiv>
                    {badges.map((item) => {
                        return (
                            <BadgeCard bid={item.bid} title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} fav={item.fav} activity={false} profile={profile} locked={false} handleFavorite={this.handleFavorite} />
                        );
                    })}
                </BadgeDiv>
            );
        }
    }
}

BadgeContainer.contextType = LayoutContext;
BadgeContainer.propTypes = {
    profile: PropTypes.bool,
    list: PropTypes.bool,
    username: PropTypes.string,
}

export default BadgeContainer;

const BadgeButton = styled(Button)`
    margin-top: 1em;
`;

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
