import React, { Component } from 'react';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, DateRange, Options, Main, Radios } from '../DisplayBadges/DisplayBadgesComponents';
import { ReactComponent as FeatureIcon } from '../../../images/Admin/Badges/Icons/feature.svg';
import TextInput from '../../TextInput';
import Button from '../../Button';
import Badge from './Badge';

class BadgesFormFeature extends Component {
  render() {
    return (
      <React.Fragment>
        <BadgeForm>
          <FeatureLabel><StyledFeatureIcon /><p>Your Featured Badges</p></FeatureLabel>
          <Badge title="7AM Samurai" image="https://drive.google.com/file/d/1e3F78X6aiPoocK1aSH2AgpbJdIFzVEMX/view?usp=share_link" color="#ffe1e7" secondaryColor="#AB747F" description="Have 7AM availability and work a 7AM shift." timestamp="1669256603" />
          <Badge title="7AM Samurai" image="https://drive.google.com/file/d/1e3F78X6aiPoocK1aSH2AgpbJdIFzVEMX/view?usp=share_link" color="#ffe1e7" secondaryColor="#AB747F" description="Have 7AM availability and work a 7AM shift." timestamp="1669256603" />
          <Badge title="7AM Samurai" image="https://drive.google.com/file/d/1e3F78X6aiPoocK1aSH2AgpbJdIFzVEMX/view?usp=share_link" color="#ffe1e7" secondaryColor="#AB747F" description="Have 7AM availability and work a 7AM shift." timestamp="1669256603" />
          <BadgeHR />
          <BadgeButton color="dark-grey">All Badges</BadgeButton>
        </BadgeForm>
      </React.Fragment>
    );
  }

}

export default BadgesFormFeature;

const FeatureLabel = styled.div`
    position: relative;
    top: -4em;
    left: 0.5em;
    grid-column: 1/4;
    margin-right: 48em;
    display: flex;
    background-color: #626471
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.3), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 0.5em;
    p {
      color: white;
      font-size: 1.8em;
      margin-top: 0.2em;
      padding: 0.5em 0.9em 0.5em 0.5em;
    }


`;

const StyledFeatureIcon = styled(FeatureIcon)`
    margin-left: 1em;
    margin-top: 1em;
`;

const BadgeForm = styled(FormEl)`
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 71px;
    grid-row-gap: 9px;
    height: auto;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const BadgeHR = styled.hr`
    grid-column: 1/2;
    background-color:#FFFF00;
`;

const BadgeButton = styled(Button)`
    margin-top: 28em;
    margin-left: 2em;
    margin-right: 2.8em;
    grid-column: 3;
`;
