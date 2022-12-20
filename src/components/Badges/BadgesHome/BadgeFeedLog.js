import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as ProfilePlaceholder } from '../../../images/Admin/Badges/ProfilePlaceholder.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as BadgeOutline } from '../../../images/Admin/Badges/FeedBadgeOutline.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';
import { ReactComponent as BadgeOuterOutline } from '../../../images/Admin/Badges/BadgeOutline.svg';

const dayjs = require('dayjs');

const BadgeFeedLog = ({ title, color, secondaryColor, image, description, timestamp, user }, props) => {
  const imageID = image.match(/[-\w]{25,}/);

  return(
      <FeedContainer color={secondaryColor}>
          <FeedLabel color={secondaryColor}><p>{user}</p></FeedLabel>
          <ProfileIcon />
          {imageID != null ? <BadgeIcon width="200px" height="200px" src={`https://drive.google.com/uc?export=view&id=${imageID}`} /> : <CardNoIcon /> }
            <ProfileOutline />
            <OuterOutline color={color} />
            <BadgeTitleDiv><BadgeTitle>{title}</BadgeTitle></BadgeTitleDiv>
            <FeedRibbon color={secondaryColor} />
            <FeedCardContainer>
                <FeedCard>
                        <TitleHR />
                        <CardTitle>{title}</CardTitle>
                        <CardDesc color={secondaryColor}>{description}</CardDesc>
                        <CardTimestamp color={secondaryColor}>Achieved {dayjs(timestamp/100).format('MM-DD-YYYY')} at {dayjs(timestamp/100).format('hh:mm A')}</CardTimestamp>
                </FeedCard>
            </FeedCardContainer>
      </FeedContainer>
  );
}

BadgeFeedLog.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number,
    user: PropTypes.string
}

export default BadgeFeedLog;

const BadgeTitleDiv = styled.div`
    @media (max-width: 800px) {
        position: relative;
        display: flex;
        margin: 0 auto;
    }
`;

const CardNoIcon = styled(NoIcon)`
    position: absolute;
    width: 9em;
    height: 9em;
    bottom: 6.4em;
    left: 6.5em;
    z-index: 2;

    @media (max-width: 1250px) {
        width: 7.5em;
        height: 7.5em;
        left: 7.5em;
        top: 4.7em;
    }

    @media (max-width: 800px) {
        width: 9em;
        height: 9em;
        position: relative;
        display: flex;
        margin: 0 auto;
        top: -0.3em;
        left: 0;
    }
`;

const CardTimestamp = styled.p`
    color: ${props => (props.color) || '#fff'};

    @media (max-width: 1250px) {
        font-size: 1em;
    }
`;

const CardDesc = styled.p`
    font-weight: 400;
    font-size: 1.4em;
    color: ${props => (props.color) || '#fff'};
    margin-left: 1em;
    margin-right: 1em;

    @media (max-width: 1250px) {
        font-size: 1em;
    }
`;

const TitleHR = styled.hr`
    position: absolute;
    top: 2.7em;
    left: 0.5em;
    z-index: 1;
    padding-right: 20em;
    @media (max-width: 1250px) and (min-width: 800px) {
        padding-right: 17em;
    }

    @media (max-width: 800px) {
        display: none;
    }
`;

const CardTitle = styled.p`
    color: #626471;
    font-weight: 600;
    font-size: 1.5em;
    z-index: 2;
    margin-top: 0.5em;

    @media (max-width: 1250px) {
        font-size: 1.2em;
    }
`;

const FeedCardContainer = styled.div`
    @media (max-width: 800px) {
        display: flex;
        position: relative;
        margin: 0 auto;
        bottom: 52em;
    }
`;

const FeedCard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    position: absolute;
    background-color: var(--white);
    width: 21em;
    height: 17em;
    top: 0em;
    left: 23.3em;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    text-align: center;

    @media (max-width: 1250px) and (min-width: 800px) {
        width: 18em;
        height: 14em;
        left: 26em;
    }

    @media (max-width: 800px) {
        width: 90%;
        position: relative;
        left: 0em;
        margin: 1em auto 0 auto;
    }
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 14.2em;
    left: 7.5em;
    color: white;
    z-index: 100;
    text-transform: uppercase;
    font-weight: 500;

    @media (max-width: 1250px) and (min-width: 800px) {
        top: 14.1em;
        left: 9.2em;
        font-size: 0.9em;
    }

    @media (max-width: 800px) {
        left: 0em;
        font-size: 0.8em;
        top: -61.4em;
        display: flex;
        position: relative;
        margin: 0 auto;
    }
`;

const FeedRibbon = styled(Ribbon)`
    position: absolute;
    z-index: 2;
    width: 14em;
    bottom: 2.6em;
    left: 4em;

    @media (max-width: 1250px) and (min-width: 800px) {
        width: 11em;
        bottom: 2.1em;
        left: 5.6em;
    }

    @media (max-width: 800px) {
        position: relative;
        width: 10em;
        display: flex;
        margin: 0 auto;
        bottom: 52em;
        left: 0em;
    }
`;

const OuterOutline = styled(BadgeOuterOutline)`
    position: absolute
    z-index: 2;
    width: 11em;
    top: -3.2em;
    left: 5.5em

    @media (max-width: 1250px) and (min-width: 800px) {
        width: 9em;
        top: -3.9em;
        left: 6.7em;
    }

    @media (max-width: 800px) {
        position: relative;
        display: flex;
        margin: 0 auto;
        left: 0em;
        top: -41.9em;
    }
`;

const BadgeIcon = styled.img`
    width: 9em;
    height: 9em;
    z-index: 2;
    position: absolute;
    top: 4.7em;
    left: 6.5em;
    @media (max-width: 1250px) and (min-width: 800px) {
        width: 7.5em;
        height: 7.5em;
        left: 7.5em;
    }

    @media (max-width: 800px) {
        position: relative;
        display: flex;
        margin: 0 auto;
        top: -0.3em;
        left: 0;
    }
`;

const ProfileOutline = styled(BadgeOutline)`
    width: 20em;
    position: absolute;
    bottom: -1.9em;
    left: 1em;

    @media (max-width: 800px) {
        width: 15em;
        position: relative;
        display: flex;
        left: 0em;
        bottom: 16em;
        margin: 0 auto;
    }
`;

const ProfileIcon = styled(ProfilePlaceholder)`
    z-index: 5;
    position: absolute;
    bottom: 15.5em;
    left: 2em;
    width: 7em;
    @media (max-width: 1250px) {
        width: 5em;
        top: -6.5em;
    }
`;

const FeedLabel = styled.div`
    z-index: 3;
    position: relative;
    top: -2em;
    left: 1em;
    grid-column: 1/4;
    margin-right: 27em;
    display: flex;
    background-color: ${props => (props.color) || '#626471'}
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.3), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 0.5em;
    p {
      position: relative;
      left: 5em;
      color: white;
      font-size: 1.8em;
      margin-top: 0.2em;
      padding: 0.5em 0.9em 0.5em 0.5em;
    }

    @media (max-width: 1250px) and (min-width: 1200px) {
        p {
            font-size: 1.6em;
            padding: 0.5em 0em 0em 0.5em;
        }
    }

    @media (max-width: 1200px) and (min-width: 800px) {
        width: 300px;
    }

    @media (max-width: 800px) {
        width: 100%;
        left: 0em;
    }
`;

const FeedContainer = styled.div`

    position: relative;
    background: linear-gradient(180deg, var(--white) 50%, ${props => (props.color) || '#fff'} 50%);
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    height: 20em;
    margin-top: 8em;
    @media (max-width: 1250px) and (min-width: 800px) {
        height: 18em;
    }

    @media (max-width: 800px) {
        height: 37em;
        background: linear-gradient(180deg, var(--white) 35%, ${props => (props.color) || '#fff'} 35%);
    }
`;