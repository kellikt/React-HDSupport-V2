import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { ReactComponent as Outline } from '../../../images/Admin/Badges/BadgeOutline.svg';
import { ReactComponent as Ribbon } from '../../../images/Admin/Badges/BadgeRibbon.svg';
import { ReactComponent as Section } from '../../../images/Admin/Badges/BadgeSection.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';
import { Tooltip } from 'react-tooltip';

const dayjs = require('dayjs');

const Badge = ({ title, image, color, secondaryColor, description, timestamp, notes, staffUsername }, props) => {
    const imageID = image.match(/[-\w]{25,}/);

    const TimestampDesc = `Awarded by ${staffUsername}`;
    const TimestampNotesDesc = `${notes} - ${staffUsername}`;

    return(
        <BadgeContainer>
            <StyledOutline color={color}/>
            {imageID != null ? <BadgeIcon width="200px" height="200px" referrerPolicy="no-referrer" src={`https://lh3.google.com/u/0/d/${imageID}`} /> : <StyledNoIcon /> }
            {title.length > 11 ?
                <div>
                    <BadgeTitle id={"anchor" + title + timestamp}>{title.substring(0, 11)}...</BadgeTitle>
                    <Tooltip anchorSelect={"#anchor" + title + timestamp} content={title} />
                </div>
            :
                <BadgeTitle>{title}</BadgeTitle>
            }
            <StyledRibbon color={secondaryColor}/>
            {description.length > 60 ? 
            <div>
                <Tooltip />
                <BadgeDescription data-tip={description}>{description.substring(0, 60)}...</BadgeDescription>
            </div>
            :
                <BadgeDescription>{description}</BadgeDescription>
            }
            <StyledSection color={secondaryColor}/>
            {notes && notes.length > 0 ?
                <div>
                    <Tooltip />
                <TimestampText data-tip={TimestampNotesDesc}>Achieved {dayjs.unix(timestamp).format('MM-DD-YYYY')}</TimestampText>
                </div>
            :
                <div>
                    <TimestampText id={"#anchor-timestamp" + title + timestamp}>Achieved {dayjs.unix(timestamp).format('MM-DD-YYYY')}</TimestampText>
                    <Tooltip anchorSelect={"#anchor-timestamp" + title + timestamp} content={TimestampDesc}/>
                </div>
            }
        </BadgeContainer>
    );
}

Badge.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    timestamp: PropTypes.number,
    notes: PropTypes.string,
    staffUsername: PropTypes.string
}

export default Badge;

const StyledNoIcon = styled(NoIcon)`
    position: absolute;
    width: 12em;
    height: 12em;
    top: -0.1em;
    left: 1.8em;

    @media (max-width: 1200px) and (min-width: 701px) {
        width: 9em;
        height: 9em;
        top: -0.3em;
        left: 0em;
    }

    @media (max-width: 700px) {
        width: 10em;
        height: 10em;
        top: -0.3em;
        left: 1.6em;
    }
`;

const BadgeContainer = styled.div`
    position: relative;
    margin-left: 4em;
    margin-top: 3em;
    display: inline-block;

    @media (max-width: 700px) {
        margin: 3em auto 0em auto;
        display: flex;
        width: 50%;
    }

    @media (max-width: 500px) {
        margin: 4em auto 0em auto;
        width: 75%;
    }

`;

const StyledOutline = styled(Outline)`
    position: absolute;
    top: -6.5em;

    @media (max-width: 1200px) and (min-width: 701px) {
        width: 11em;
        height: 11em;
        top: -1.3em;
        left: -1em;
    }

    @media (max-width: 700px) {
        width: 12em;
        top: -7.7em;
        left: 0.6em;
    }
`;

const BadgeIcon = styled.img`
    position: absolute;
    top: -0.4em;
    left: 1.6em;

    @media (max-width: 1200px) and (min-width: 700px) {
        width: 9em;
        height: 9em;
        left: 0em;
    }

    @media (max-width: 700px) {
        width: 10em;
        height: 10em;
    }
`;

const BadgeTitle = styled.p`
    position: absolute;
    top: 13.5em;
    left: 4.5em;
    color: white;
    z-index: 100;
    text-transform: uppercase;
    font-weight: 500;

    @media (max-width: 1200px) and (min-width: 701px) {
        font-size: 0.8em;
        top: 11.7em;
        left: 2.5em;
        font-size: 0.8em;
    }

    @media (max-width: 700px) {
        top: 10.5em;
        left: 3.5em;
    }
`;

const StyledRibbon = styled(Ribbon)`
    position: absolute;
    top: 11.7em;
    left: 0;

    @media (max-width: 1200px) and (min-width: 701px) {
        width: 10em;
        top: 7.5em;
        left: -0.3em;
    }

    @media (max-width: 700px) {
        top: 8.7em;
        left: -1em;
    }
`;

const BadgeDescription = styled.p`
    position: absolute;
    top: 20em;
    left: 3em;
    inline-size: 10em;
    color: white;
    z-index: 100;

    @media (max-width: 1200px) {
        display: none;
    }
`;

const StyledSection = styled(Section)`
    position: absolute;
    top: 11.5em;
    left: 0;

    @media (max-width: 1200px) {
        display: none;
    }
`;

const TimestampText = styled.p`
    position: relative;
    top: 25em;
    width: 80%;
    text-align: center;
    font-style: italic;
    font-size: 0.99em;

    @media (max-width: 1200px) {
        display: none;
    }
`;