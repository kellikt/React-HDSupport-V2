import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as Outline } from '../../../images/Admin/Badges/BadgeOutline.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as Section } from '../../../images/Admin/Badges/BadgeSection.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';

const dayjs = require('dayjs');

const Badge = ({ title, image, color, secondaryColor, description, timestamp }, props) => {
    const imageID = image.match(/[-\w]{25,}/);

    return(
        <BadgeContainer>
            <StyledOutline color={color}/>
            {imageID != '' ? <BadgeIcon width="200px" height="200px" src={`https://drive.google.com/uc?export=view&id=${imageID}`} /> : <NoIcon /> }
            <BadgeTitle>{title}</BadgeTitle>
            <StyledRibbon color={secondaryColor}/>
            <BadgeDescription>{description}</BadgeDescription>
            <StyledSection color={secondaryColor}/>
            <TimestampText>Achieved {dayjs(timestamp/100).format('MM-DD-YYYY')} at {dayjs(timestamp/100).format('hh:mm A')}</TimestampText>
        </BadgeContainer>
    );
}

Badge.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number
}

export default Badge;

const BadgeContainer = styled.div`
    position: relative;
    margin-left: 2.2em;
    display: inline-block;
`;

const StyledOutline = styled(Outline)`
    position: absolute;
    top: -6.5em;

    @media (max-width: 900px) {
      width: 200px;
    }
`;

const BadgeIcon = styled.img`
    position: absolute;
    top: -0.4em;
    left: 1.6em;
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 13.5em;
    left: 4.5em;
    color: white;
    z-index: 100;
    text-transform: uppercase;
    font-weight: 500;
`;

const StyledRibbon = styled(Ribbon)`
    position: absolute;
    top: 11.7em;
    left: 0;
`;

const BadgeDescription = styled.p`
    position: absolute;
    top: 20em;
    left: 3em;
    inline-size: 10em;
    color: white;
    z-index: 100;
`;

const StyledSection = styled(Section)`
    position: absolute;
    top: 11.5em;
    left: 0;
`;

const TimestampText = styled.p`
    position: absolute;
    top: 25em;
    font-style: italic;
    font-size: 0.99em;
`;