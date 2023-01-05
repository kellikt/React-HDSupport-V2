import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as Outline } from '../../../images/Admin/Badges/BadgeOutline.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';
import { ReactComponent as Fav } from '../../../images/Admin/Badges/Icons/favorite.svg';
import { ReactComponent as FavBorder } from '../../../images/Admin/Badges/Icons/favoutline.svg';
import { ReactComponent as Lock } from '../../../images/Admin/Badges/Icons/lock.svg';
import { ReactComponent as Locked } from '../../../images/Admin/Badges/LockedIcon.svg';
import ReactTooltip from 'react-tooltip';

const dayjs = require('dayjs');

const BadgeIcon = ({ bid, title, image, color, secondaryColor, description, timestamp, notes, staffUsername, fav, locked, handleFavorite }, props) => {
    const imageID = image.match(/[-\w]{25,}/);

    const TimestampDesc = `Awarded by ${staffUsername}`;
    const TimestampNotesDesc = `${notes} - ${staffUsername}`;

    return(
        <BadgeContainer>
            {locked ?
            <div>
                <LockedBadge />
                <BadgeOutline color="black" />
                <BadgeRibbon color="black" />
                {title.length > 11 ? 
                <div>
                    <ReactTooltip />
                    <BadgeTitle data-tip={title}>{title.substring(0, 10)}...</BadgeTitle>
                </div>
                :
                <BadgeTitle>{title}</BadgeTitle>
                }
                <ReactTooltip />
                <BadgeLock data-tip="Badge Locked" color="black" />
            </div>
            :
                <div>
                {imageID == null ? 
                    <NoBadge />
                :
                    <BadgeImage width="80.97px" height="80.97px" src={`https://drive.google.com/uc?export=view&id=${imageID}`}  />
                }
                <BadgeOutline color={color} />
                <BadgeRibbon color={secondaryColor} />
                {title.length > 11 ? 
                <div>
                    <ReactTooltip />
                    <BadgeTitle data-tip={title}>{title.substring(0, 10)}...</BadgeTitle>
                </div>
                :
                <BadgeTitle>{title}</BadgeTitle>
                }
                {fav === 0 ?
                    <Favorite color={"white"}><FavOutline color={"transparent"} border={secondaryColor} animate={fav} onClick={() => handleFavorite(bid, fav)}/></Favorite>
                :
                    <Favorite color={"transparent"}><FavIcon color={"white"} border={secondaryColor} animate={fav} onClick={() => handleFavorite(bid, fav)}/></Favorite>
                }
            </div>
        }
        </BadgeContainer>
    );
}

BadgeIcon.propTypes = {
    bid: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number,
    notes: PropTypes.string,
    staffUsername: PropTypes.string,
}

export default BadgeIcon;

const BadgeContainer = styled.div`
    position: relative;
    margin: 0 auto;
`;

const BadgeImage = styled.img`
    position: relative;
    width: 7em;
    height: 7em;
`;

const NoBadge = styled(NoIcon)`
    width: 7em;
    height: 7em;
    position: relative;
`;

const LockedBadge = styled(Locked)`
    width: 7em;
    height: 7em;
    position: relative;
`;

const BadgeOutline = styled(Outline)`
    position: absolute;
    width: 8.5em;
    top: -8.9em;
    left: -0.75em;
    z-index: -1;
`;

const BadgeRibbon = styled(Ribbon)`
    position: absolute;
    width: 12em;
    left: -2.5em;
    top: 5.8em;
`;

const BadgeTitle = styled.p`
    position: relative;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    top: 0.5em;
    text-align: center;
    margin: 0 auto;

`;

const likeAnimation = keyframes`
    0% {
        transform: scale(.8);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const FavIcon = styled(Fav)`
    width: 50px;
    border: ${props => (props.border)};
    color: ${props => (props.border)};
`;

const FavOutline = styled(FavBorder)`
    width: 50px;
    color: ${props => (props.border)};
`;

const Favorite = styled.button`
    background: none;
    border: none;
    position: absolute;
    width: 3.5em;
    top: -2em;
    left: 8.5em;

    &:hover ${FavIcon} {
        transition: all 0.4s ease;
        transform: scale(.8);
    }

    &:hover ${FavOutline} {
        transition: all 0.4s ease;
        transform: scale(.8);
    }

    &:active {
        animation: ${likeAnimation} 1s ease;
    }
`;

const BadgeLock = styled(Lock)`
    position: absolute;
    left: 7.5em;
    top: -1em;
`;