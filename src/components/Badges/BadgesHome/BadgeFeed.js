import React, { Component } from 'react';
import styled from 'styled-components';

import BadgeFeedLog from './BadgeFeedLog';

class BadgeFeed extends Component {
  render() {
    return (
      <React.Fragment>
        <ActivityLog>
            <BadgeFeedLog title="7AM Samurai" color="#ffe1e7" secondaryColor="ab747f" image="https://drive.google.com/file/d/1e3F78X6aiPoocK1aSH2AgpbJdIFzVEMX/view?usp=share_link" description="Have 7AM availability and work a 7AM shift." timestamp="1669256907" user="Larry Sashimi" />
        </ActivityLog>
      </React.Fragment>
    );
  }

}

export default BadgeFeed;

const ActivityLog = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding-top: 1em;
`;