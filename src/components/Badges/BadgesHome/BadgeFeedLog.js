import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BadgeFeedLog = ({ title, color, secondaryColor, image, description, timestamp, user }, props) => {
  //const imageID = image.match(/[-\w]{25,}/);

  return(
      <FeedContainer color={secondaryColor}>
          <p>test</p>
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

const FeedContainer = styled.div`

    position: relative;
    background: linear-gradient(left, var(--white) 50%, #${props => (props.color) || '#fff'}; 50%);
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    height: 15em;
`;