import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
 
import { ReactComponent as Circle } from '../../../images/Admin/Badges/BadgeWhitespace.svg';
import { ReactComponent as Triangle } from '../../../images/Admin/Badges/BadgeTriangle.svg';
import { ReactComponent as Outline } from '../../../images/Admin/Badges/BadgeOutline.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';
import { ReactComponent as Diamond } from '../../../images/Admin/Badges/BadgeDiamond.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as Icon } from '../../../images/Admin/Badges/Icons/recent.svg';


const dayjs = require('dayjs');

const BadgeCard = ({ title, color, secondaryColor, image, description, timestamp }, props) => {
    const imageID = image.match(/[-\w]{25,}/);

  return(
      <CardContainer color={secondaryColor}>
          <RecentLabel color={secondaryColor}><RecentIcon /><p>  Recently Unlocked</p></RecentLabel>
          <BadgeCircle />
          <BadgeTriangle />
          <BadgeOutline color={color}/>
          {imageID != '' ? <BadgeImage width="200px" height="200px" src={`https://drive.google.com/uc?export=view&id=${imageID}`} /> : <NoIcon /> }
          <BadgeRibbon color={secondaryColor}/>
          <BadgeDiamond color={secondaryColor}/>
          <BadgeTitle>{title}</BadgeTitle>
          <BadgeDescription>{description}</BadgeDescription>
          <BadgeTimestamp>Achieved {dayjs(timestamp/100).format('MM-DD-YYYY')} at {dayjs(timestamp/100).format('hh:mm A')}</BadgeTimestamp>
      </CardContainer>
  );

}

BadgeCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number,
}

export default BadgeCard;

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
`;

const BadgeTimestamp = styled.p`
    position: absolute;
    top: 20em;
    left: 2.2em;
    color: var(--white);
    font-style: italic;
    font-size: 0.9em;
`;

const BadgeDescription = styled.p`
    position: absolute;
    top: 16em;
    left: 2em;
    color: var(--white);
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 11.2em;
    left: 11.3em;
    font-size: 0.8em;
    text-transform: uppercase;
    color: var(--white);
    
`;

const BadgeRibbon = styled(Ribbon)`
    position: absolute;
    width: 10em;
    top: 7em;
    left: 6.8em;
`;

const BadgeDiamond = styled(Diamond)`
    position: absolute;
    top: 10.7em;
    left: 11em;
    width: 1.8em;
`;

const BadgeImage = styled.img`
    position: absolute;
    width: 6.5em;
    height: 6.5em;
    top: 2.1em;
    left: 8.55em;
`;

const BadgeOutline = styled(Outline)`
    position: absolute;
    width: 7.8em;
    bottom: 2.3em;
    left: 7.85em;
`;

const BadgeCircle = styled(Circle)`
    position: absolute;
    width: 9.5em;
    left: 7em;
    bottom: 6.5em;
`;

const BadgeTriangle = styled(Triangle)`
    position: absolute;
    width: 8em;
    top: 9.7em;
    left: 7.8em;    
`;

const CardContainer = styled.div`
    position: relative;
    background: linear-gradient(180deg, #ab747f,#ab747f 30%,var(--white) 30%,var(--white) 60%,#ab747f 60%);
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    height: 20em;
    margin-top: 8em;
`;