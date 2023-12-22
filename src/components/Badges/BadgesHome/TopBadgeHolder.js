import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import { ReactComponent as Frame } from '../../../images/Admin/Badges/TopBadge.svg';
import { ReactComponent as Star } from '../../../images/Admin/Badges/Star.svg';
import { ReactComponent as ProfilePlaceholder } from '../../../images/Admin/Badges/ProfilePlaceholder.svg';

const TopBadgeHolder = () => {

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        profileURL: '',
        badges: 0,
    })

    const getTopBadger = async () => {
        try {
            const request = await axios.get(`${process.env.REACT_APP_DB_SERVER}/get-top-badges.php`);
            const data = request.data[0];
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const getProfilePic = async (data) => {
        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-slack-profile.php`, {
                email: `${data.username}@hawaii.edu`
            });
            const URL = request.data;
            setState({
                firstName: data.first_name,
                lastName: data.last_name,
                username: data.username,
                badges: data.count,
                profileURL: URL
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTopBadger().then(getProfilePic);
    }, [])

    return (
        <Container>
            <Label>
                <HolderIcon />
                <h2>Top Badge Holder</h2>
            </Label>
            <h3>{state.firstName} {state.lastName}</h3>
            {state.profileURL ? 
                <BadgeFrame>
                    <SlackProfile src={state.profileURL} />
                    <TopBadge />
                </BadgeFrame>
            :
                <BadgeFrame>
                    <NoProfile />
                    <TopBadge />
                </BadgeFrame>
            }
            <p>Total Badges: {state.badges}</p>
        </Container>
    );

}

export default TopBadgeHolder;

const Container = styled.div`
    background: linear-gradient(180deg, #8B8C99 0%, #626471 100%);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 80px;
    display: block;
    align-items: center;
    color: white;

    h3 {
        font-size: 40px;
        margin: auto;
        text-align: center;
        font-weight: 400;
    }

    p {
        margin: auto;
        text-align: center;
    }

    @media (max-width: 900px) {
        margin-top: 100px;
    }

    @media (max-width: 375px) {
        padding: 30px 0px 30px 0px;
    }
`;

const BadgeFrame = styled.div`
    position: relative;
`;

const TopBadge = styled(Frame)`
    position: relative;
    display: block;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const NoProfile = styled(ProfilePlaceholder)`
    position: absolute;
    left: 0;
    right: 0;
    top: 3em;
    margin: auto;
    border: 5px white solid;
    border-radius: 100px;

`;

const Label = styled.div`
    width: 22em;
    position: relative;
    top: -5em;
    left: -1.05em;
    display: flex;
    background-color: #626471;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.3), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 0.5em;

    h2 {
        color: white;
        font-size: 1.8em;
        padding: 0.2em 0.5em 0.2em 0.5em;
        margin-left: 1em;
    }

    @media (max-width: 1064px) {
        top: -4em;
        left: 0em;
        width: 100%;
    }

`;

const SlackProfile = styled.img`
    position: absolute;
    left: 0;
    right: 0;
    top: 3em;
    margin: auto;
    border: 5px white solid;
    border-radius: 100px;
`;

const HolderIcon = styled(Star)`
    position: relative;
    top: 1.9em;
    left: 1.5em;
`;