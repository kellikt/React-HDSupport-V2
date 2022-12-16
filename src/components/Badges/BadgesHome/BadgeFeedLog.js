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
          <IconDiv><ProfileIcon /></IconDiv>
          <BadgeDiv>{imageID != '' ? <BadgeIcon width="200px" height="200px" src={`https://drive.google.com/uc?export=view&id=${imageID}`} /> : <NoIcon /> }</BadgeDiv>
          <OutlineDiv><ProfileOutline /></OutlineDiv>
          <BadgeOutlineDiv><OuterOutline color={color} /></BadgeOutlineDiv>
          <BadgeTitle>{title}</BadgeTitle>
          <FeedRibbon color={secondaryColor} />
          <FeedCard>
              <TitleHR />
              <CardTitle>{title}</CardTitle>
              <CardDesc color={secondaryColor}>{description}</CardDesc>
              <CardTimestamp color={secondaryColor}>Achieved {dayjs(timestamp/100).format('MM-DD-YYYY')} at {dayjs(timestamp/100).format('hh:mm A')}</CardTimestamp>
          </FeedCard>
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

const CardTimestamp = styled.p`
    position: absolute;
    top: 15em;
    left: 2.3em;
    color: ${props => (props.color) || '#fff'};
`;

const CardDesc = styled.p`
    position: absolute;
    top: 5em;
    left: 1.6em;
    padding-right: 1.5em;
    font-weight: 400;
    font-size: 1.4em;
    color: ${props => (props.color) || '#fff'};
`;

const TitleHR = styled.hr`
    position: absolute;
    top: 2.7em;
    left: 0.5em;
    z-index: 1;
    padding-right: 20em;
`;

const CardTitle = styled.p`
    position: absolute;
    color: #626471;
    font-weight: 600;
    font-size: 1.5em;
    top: 1.5em;
    left: 3.6em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background-color: var(--white);
    z-index: 2;
`;

const FeedCard = styled.div`
    position: absolute;
    background-color: var(--white);
    height: 17em;
    width: 21em;
    top: 0em;
    left: 23.3em;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 14.7em;
    left: 7.5em;
    color: white;
    z-index: 100;
    text-transform: uppercase;
    font-weight: 500;
`;

const FeedRibbon = styled(Ribbon)`
    position: relative;
    z-index: 2;
    width: 14em;
    bottom: 62.6em;
    left: 4em;
`;

const BadgeOutlineDiv = styled.div`
    z-index: 2;
    position: relative;
    bottom: 53.4em;
    left: 5.5em;
`;

const OuterOutline = styled(BadgeOuterOutline)`
    width: 11em;
`;

const BadgeDiv = styled.div`
    z-index: 2;
    position: relative;
    top: -11.4em;
    left: 6.5em;
`;

const BadgeIcon = styled.img`
    width: 9em;
    height: 9em;
`;

const OutlineDiv = styled.div`
    z-index: 1;
    position: relative;
    bottom: 28.7em;
    left: 1em;
`;

const ProfileOutline = styled(BadgeOutline)`
    width: 20em;
`;

const IconDiv = styled.div`
    z-index: 5;
    position: relative;
    bottom: 12em;
    left: 2em;
    width: 7em;
`;

const ProfileIcon = styled(ProfilePlaceholder)`
    width: 7em;
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
`;

const FeedContainer = styled.div`

    position: relative;
    background: linear-gradient(180deg, var(--white) 50%, ${props => (props.color) || '#fff'} 50%);
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    height: 20em;
    margin-top: 8em;
`;