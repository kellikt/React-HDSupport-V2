import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';

import BadgeFeedLog from './BadgeFeedLog';
import BadgeCard from './BadgeCard';

class BadgeFeed extends Component {

  constructor(props) {
      super(props);
      this.state = {
          badgeActivity: [],
          recentActivity: [],
          isLoading: true,
      };
  }

  async componentDidMount() {
      try {
          const feed = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badge-activity.php`, {
              log: "yes",
          });
          const activity = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badge-activity.php`, {
              log: "no",
          });
          const data = await Promise.all([feed, activity]);
          this.setState({
              badgeActivity: data[0].data,
              recentActivity: data[1].data,
              isLoading: false,
          });

      } catch (error) {
          console.log(error);
      }
  }

  render() {
    const { badgeActivity, recentActivity } = this.state;

    return (
      <React.Fragment>
        <ActivityLog>
          <div id="activity">
          {badgeActivity.map((item, index) => {
              return (
                  <BadgeFeedLog title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} user={item.first_name} />
              );
          })}
          </div>
          <div id="recent">
              {recentActivity.map((item, index) => {
                  return (
                    <BadgeCard title={item.title} color={item.hex} secondaryColor={item.hex_secondary} image={item.link} description={item.description} timestamp={item.tstamp} activity={true} profile={false} locked={false} />
                  )
              })}
          </div>
        </ActivityLog>
      </React.Fragment>
    );
  }

}

export default BadgeFeed;

const ActivityLog = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 5em;
    @media (max-width: 1250px) and (min-width: 1200px) {
        column-gap: 1em;
    }
    @media (max-width: 1200px) {
        #recent {
          display: none;
        }
        #activity {
          grid-column: 1/3;
        }
  }
`;