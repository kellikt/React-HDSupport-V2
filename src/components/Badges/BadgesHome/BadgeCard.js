import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
 
import { ReactComponent as Circle } from '../../../images/Admin/Badges/BadgeWhitespace.svg';
import { ReactComponent as Triangle } from '../../../images/Admin/Badges/BadgeTriangle.svg';
import { ReactComponent as Outline } from '../../../images/Admin/Badges/BadgeOutline.svg';
import { ReactComponent as None } from '../../../images/Admin/Badges/NoBadge.svg';
import { ReactComponent as Diamond } from '../../../images/Admin/Badges/BadgeDiamond.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as Icon } from '../../../images/Admin/Badges/Icons/recent.svg';
import { ReactComponent as Fav } from '../../../images/Admin/Badges/Icons/favorite.svg';


const dayjs = require('dayjs');

const BadgeCard = ({ bid, title, color, secondaryColor, image, description, timestamp, activity, profile, fav, handleFavorite }, props) => {
    const imageID = image.match(/[-\w]{25,}/);
    const current = dayjs().unix();
    const currentMonth = dayjs().date(1).unix();

    const [favorite, setFavorite] = useState(fav);

    function updateFavorite(fav) {
        const changedFavorite = fav == 0 ? 1 : 0;
        setFavorite(changedFavorite);
    }

    return(
        <CardContainer color={secondaryColor}>
            {(timestamp >= currentMonth.valueOf() && timestamp <= current.valueOf()) || (activity) ?
                <RecentLabel color={secondaryColor}><RecentIcon /><p>  Recently Unlocked</p></RecentLabel>
                : ''
            }
            {
                (() => {
                    if (profile) {
                        if (favorite == 0) {
                            return <Favorite color={"white"}><FavIcon color={"transparent"} onClick={() => handleFavorite(bid, favorite, updateFavorite)}/></Favorite>
                        } else {
                            return <Favorite color={"transparent"}><FavIcon color={"white"} onClick={() => handleFavorite(bid, favorite, updateFavorite)}/></Favorite>
                        }
                    }
                })()
            }
            <BadgeCircle />
            <BadgeTriangle />
            <BadgeOutline color={color}/>
            {imageID != null ? <BadgeImage width="200px" height="200px" src={`https://drive.google.com/uc?export=view&id=${imageID}`} /> : <NoIcon /> }
            <BadgeRibbon color={secondaryColor}/>
            <BadgeDiamond color={secondaryColor}/>
            <BadgeTitle>{title}</BadgeTitle>
            <BadgeDescription>{description}</BadgeDescription>
            <BadgeTimestamp>Achieved {dayjs(timestamp/100).format('MM-DD-YYYY')} at {dayjs(timestamp/100).format('hh:mm A')}</BadgeTimestamp>
        </CardContainer>
    );

}

BadgeCard.propTypes = {
    bid: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number,
    fav: PropTypes.number,
    activity: PropTypes.bool,
    profile: PropTypes.bool,
    handleFavorite: PropTypes.func,
}

export default BadgeCard;

const NoIcon = styled(None)`
    position: absolute;
    width: 7em;
    left: 8.3em;
    top: 2.2em;

    @media (max-width: 1250px) {
        width: 6em;
        left: 9em;
        top: 2em;
    }
`;

const FavIcon = styled(Fav)`
    color: ${props => (props.color)};
`;

const Favorite = styled.button`
    background: none;
    border: none;
    position: absolute;
    width: 3.5em;
    top: 1em;
    left: 20.5em;

    &:hover ${FavIcon} {
        color: ${props => (props.color)};
    }
`;

const RecentIcon = styled(Icon)`
    width: 1.5em;
`;

const RecentLabel = styled.div`
    display: flex;
    position: absolute;
    background-color: #46474E; 
    padding: 0em 0.5em 0em 0.5em;
    border-radius: 0.4em;
    bottom: 18.6em;
    left: 1em;
    color: var(--white);
    z-index: 3;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);

    p {
      font-weight: 400;
      top: 1em;
      margin: 1em 0em 0em 0.5em;
    }

    @media (max-width: 1250px) {
        bottom: 16.6em;
    }
`;

const BadgeTimestamp = styled.p`
    position: absolute;
    top: 20em;
    left: 2.2em;
    color: var(--white);
    font-style: italic;
    font-size: 0.9em;

    @media (max-width: 1250px) {
        top: 20.5em;
        font-size: 0.8em;
        left: 3.3em;
    }
`;

const BadgeDescription = styled.p`
    position: absolute;
    top: 16em;
    left: 2em;
    color: var(--white);

    @media (max-width: 1250px) {
        top: 15em;
        font-size: 0.9em;
        left: 3em;
    }
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 11.2em;
    left: 11.3em;
    font-size: 0.8em;
    text-transform: uppercase;
    color: var(--white);
    
    @media (max-width: 1250px) {
        top: 11.2em;
        left: 12.8em;
        font-size: 0.75em;
    }
`;

const BadgeRibbon = styled(Ribbon)`
    position: absolute;
    width: 10em;
    top: 7em;
    left: 6.8em;

    @media (max-width: 1250px) {
        width: 9em;
        top: 6.5em;
        left: 7.6em;
    }
`;

const BadgeDiamond = styled(Diamond)`
    position: absolute;
    top: 10.7em;
    left: 11em;
    width: 1.8em;

    @media (max-width: 1250px) {
        width: 1.5em;
        top: 9.7em;
        left: 11.1em;
    }
`;

const BadgeImage = styled.img`
    position: absolute;
    width: 6.5em;
    height: 6.5em;
    top: 2.1em;
    left: 8.55em;

    @media (max-width: 1250px) {
        width: 6em;
        height: 6em;
        top: 2.1em;
        left: 9em;
    }
`;

const BadgeOutline = styled(Outline)`
    position: absolute;
    width: 7.8em;
    bottom: 2.3em;
    left: 7.85em;

    @media (max-width: 1250px) {
        width: 7em;
        bottom: 0.5em;
        left: 8.5em;
    }
`;

const BadgeCircle = styled(Circle)`
    position: absolute;
    width: 9.5em;
    left: 7em;
    bottom: 6.5em;
    @media (max-width: 1250px) {
        width: 8em;
        top: -3em;
        left: 8em;
    }
`;

const BadgeTriangle = styled(Triangle)`
    position: absolute;
    width: 8em;
    top: 9.7em;
    left: 7.8em;
    @media (max-width: 1250px) {
        width: 4em;
        top: 9em;
        left: 9.8em;
    }    
`;

const CardContainer = styled.div`
    position: relative;
    background: linear-gradient(180deg, ${props => (props.color) || '#fff'},${props => (props.color) || '#fff'} 30%,var(--white) 30%,var(--white) 60%,${props => (props.color) || '#fff'} 60%);
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    height: 20em;
    margin-top: 8em;

    @media (max-width: 1250px) {
        height: 18em;
    }
    @media (max-width: 1199px) {
        width: 25em;
    }

    @media (max-width: 920px) {
        position: relative;
        margin: 3em auto;
    }

    @media (max-width: 500px) {
        width: 23em;
    }
`;