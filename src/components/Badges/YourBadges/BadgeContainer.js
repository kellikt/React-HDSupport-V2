import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';

import BadgeCard from '../BadgesHome/BadgeCard';
import { Inputs } from '../AddBadge/AddBadgeComponents';
import { LayoutContext } from '../../../LayoutContext';

import { ReactComponent as Desktop } from '../../../images/Admin/Badges/BadgesDesktopForm.svg';
import { ReactComponent as Lightbulb } from '../../../images/Admin/Badges/BadgesLightbulbForm.svg';

function BadgeContainer(props) {
    const [state, setState] = useState({
        badges: [],
        selectedView: 'all',
        userBadges: [],
        allBadges: true,
    });

    const { username } = useContext(LayoutContext);

    const handleFavorite = async (bid, fav) => {
        const changedFavorite = fav === 0 ? 1 : 0;
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-badge-favorite.php`, {
                username: username,
                bid: bid,
                fav: changedFavorite,
            });
            getBadges();
        } catch (error) {
            console.log(error.message);
        }
    };

    const getBadges = async () => {
        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                badge: '',
                user: username,
            });

            const data = request.data;
            setState({
                ...state,
                userBadges: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setState({
            ...state,
            [name]: value,
            searched: false,
        });
    };

    const getUserBadges = async () => {
        try {
            if (props.profile) {
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: username,
                });

                const data = request.data;
                if (!(data.length === 0 || data === '')) {
                    setState({
                        ...state,
                        badges: data,
                    });
                }
            } else if (props.list) {
                const badges = axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badges.php`, {
                    name: '',
                });

                const userBadges = axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: username,
                });

                const badge_activity = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badge-activity.php`, {
                    log: 'no',
                    ranking: 'no',
                    profile: 'yes',
                });

                const data = await Promise.all([badges, userBadges, badge_activity]);
                console.log(data[2].data);
                setState({
                    ...state,
                    badges: data[0].data,
                    userBadges: data[1].data,
                });
            } else {
                const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-current-badges.php`, {
                    badge: '',
                    user: props.username,
                });

                const data = request.data;
                if (!(data.length === 0 || data === '')) {
                    setState({
                        ...state,
                        badges: data,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBadges();
    }, []);

    if (props.list) {
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
                        <select name="selectedView" id="badges" onChange={handleChange} value={state.selectedView}>
                            <option value="all">All Badges</option>
                            <option value="unlocked">Unlocked Badges</option>
                            <option value="locked">Locked Badges</option>
                            <option value="favorite">Favorite Badges</option>
                        </select>
                    </StyledInputs>
                </ViewForm>
                {state.selectedView === 'all' ? (
                    <div>
                        <BadgeDiv>
                            {state.badges.map((item, index) => {
                                if (state.userBadges.some((badge) => badge.bid === item.bid)) {
                                    const badge = state.userBadges.find((badge) => badge.bid === item.bid);
                                    return (
                                        <BadgeCard
                                            key={index}
                                            bid={item.bid}
                                            title={item.title}
                                            color={item.hex}
                                            secondaryColor={item.hex_secondary}
                                            image={item.link}
                                            description={item.description}
                                            timestamp={badge.tstamp}
                                            notes={badge.notes}
                                            staffUsername={badge.staff_username}
                                            user={item.first_name}
                                            fav={badge.fav}
                                            activity={false}
                                            profile={true}
                                            locked={false}
                                            handleFavorite={handleFavorite}
                                        />
                                    );
                                } else {
                                    return (
                                        <BadgeCard
                                            key={index}
                                            bid={item.bid}
                                            title={item.title}
                                            color="#000000"
                                            secondaryColor="#000000"
                                            image={item.link}
                                            description={item.description}
                                            timestamp={item.tstamp}
                                            user={item.first_name}
                                            fav={item.fav}
                                            activity={false}
                                            profile={false}
                                            locked={true}
                                            handleFavorite={handleFavorite}
                                        />
                                    );
                                }
                            })}
                        </BadgeDiv>
                    </div>
                ) : (
                    ''
                )}
                {state.selectedView === 'locked' ? (
                    <div>
                        <BadgeDiv>
                            {state.badges.map((item, index) => {
                                if (!state.userBadges.some((badge) => badge.bid === item.bid)) {
                                    return (
                                        <BadgeCard
                                            key={index}
                                            bid={item.bid}
                                            title={item.title}
                                            color="#000000"
                                            secondaryColor="#000000"
                                            image={item.link}
                                            description={item.description}
                                            timestamp={item.tstamp}
                                            user={item.first_name}
                                            fav={item.fav}
                                            activity={false}
                                            profile={false}
                                            locked={true}
                                            handleFavorite={handleFavorite}
                                        />
                                    );
                                } else {
                                    return '';
                                }
                            })}
                        </BadgeDiv>
                    </div>
                ) : (
                    ''
                )}
                {state.selectedView === 'unlocked' ? (
                    <div>
                        <BadgeDiv>
                            {state.userBadges.map((item, index) => {
                                return (
                                    <BadgeCard
                                        key={index}
                                        bid={item.bid}
                                        title={item.title}
                                        color={item.hex}
                                        secondaryColor={item.hex_secondary}
                                        image={item.link}
                                        description={item.description}
                                        timestamp={item.tstamp}
                                        notes={item.notes}
                                        staffUsername={item.staff_username}
                                        user={item.first_name}
                                        fav={item.fav}
                                        activity={false}
                                        profile={true}
                                        locked={false}
                                        handleFavorite={handleFavorite}
                                    />
                                );
                            })}
                        </BadgeDiv>
                    </div>
                ) : (
                    ''
                )}
                {state.selectedView === 'favorite' ? (
                    <div>
                        <BadgeDiv>
                            {state.userBadges
                                .filter((item) => item.fav === 1)
                                .map((item, index) => {
                                    return (
                                        <BadgeCard
                                            key={index}
                                            bid={item.bid}
                                            title={item.title}
                                            color={item.hex}
                                            secondaryColor={item.hex_secondary}
                                            image={item.link}
                                            description={item.description}
                                            timestamp={item.tstamp}
                                            notes={item.notes}
                                            staffUsername={item.staff_username}
                                            user={item.first_name}
                                            fav={item.fav}
                                            activity={false}
                                            profile={true}
                                            locked={false}
                                            handleFavorite={handleFavorite}
                                        />
                                    );
                                })}
                        </BadgeDiv>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    } else {
        return (
            <BadgeDiv>
                {state.badges.map((item, index) => {
                    return (
                        <BadgeCard
                            key={index}
                            bid={item.bid}
                            title={item.title}
                            color={item.hex}
                            secondaryColor={item.hex_secondary}
                            image={item.link}
                            description={item.description}
                            timestamp={item.tstamp}
                            notes={item.notes}
                            staffUsername={item.staff_username}
                            user={item.first_name}
                            fav={item.fav}
                            activity={false}
                            profile={props.profile}
                            locked={false}
                            handleFavorite={handleFavorite}
                        />
                    );
                })}
            </BadgeDiv>
        );
    }
}

export default BadgeContainer;

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
        grid-template-columns: 1fr;
    }
`;

const StyledInputs = styled(Inputs)`
    margin-top: 2em;
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
