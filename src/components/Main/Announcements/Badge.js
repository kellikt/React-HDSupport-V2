import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Arrow } from '../../../images/icons/Arrow.svg';

const Badge = () => {
    return (
        <React.Fragment>
            <BadgeEl>Announcements</BadgeEl>
            <SlackBadge href="https://csocits.slack.com/messages/C4UFGG7QT/">
                Read more on Slack
                <Arrow />
            </SlackBadge>
        </React.Fragment>
    );
};

export default Badge;

const BadgeEl = styled.a`
    position: absolute;
    z-index: 100;
    left: 25px;
    top: -13px;
    padding: 2px 15px;
    background: #005381;
    border-radius: 50px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.025em;
    color: var(--white);
    white-space: nowrap;
`;

const SlackBadge = styled(BadgeEl)`
    background: var(--blue);
    opacity: 0;
    transition: opacity 0.35s;
    display: flex;
    align-items: center;

    svg {
        width: 16px;
        height: 16px;
        margin-left: 4px;
    }

    &:hover {
        opacity: 1;
    }
`;
