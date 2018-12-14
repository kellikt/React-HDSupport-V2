import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Schedules } from '../../images/Main/Schedules.svg';
import { ReactComponent as Wiki } from '../../images/Main/Wiki.svg';
import { ReactComponent as Slack } from '../../images/Main/Slack.svg';
import { ReactComponent as Gmail } from '../../images/Main/Gmail.svg';

const LinksContainer = () => {
    return (
        <Container>
            <NavLink
                color="green"
                href="http://drive.google.com/a/hawaii.edu#folders/0B4v6QnBNmu9KMVdqYXFqeGVndEE"
                target="_blank"
            >
                <Schedules />
                <div>
                    <h3>Schedules</h3>
                    <p>Check when you work.</p>
                </div>
            </NavLink>
            <NavLink color="pink" href="https://www.hawaii.edu/bwiki/display/help/Home" target="_blank">
                <Wiki />
                <div>
                    <h3>HD Wiki</h3>
                    <p>Need help? Read this.</p>
                </div>
            </NavLink>
            <NavLink color="light-blue" href="https://csocits.slack.com/messages/" target="_blank">
                <Slack />
                <div>
                    <h3>Slack</h3>
                    <p>Send a chat within ITS.</p>
                </div>
            </NavLink>
            <NavLink color="gold" href="https://mail.google.com/a/hawaii.edu/" target="_blank">
                <Gmail />
                <div>
                    <h3>UH Gmail</h3>
                    <p>Check your messages.</p>
                </div>
            </NavLink>
        </Container>
    );
};

export default LinksContainer;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 20px;
    margin-top: 60px;
`;

const NavLink = styled.a`
    color: ${({ color }) => (color ? `var(--${color})` : 'var(--blue)')};
    display: flex;
    transition: all 0.2s ease-out;
    background-color: #fff;
    padding: 18px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    align-items: center;

    h3 {
        font-size: 24px;
        font-weight: bold;
        margin: 0 0 12px;
    }

    p {
        color: var(--dark-grey);
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
    }

    svg {
        width: 100px;
        height: 100px;
        margin-right: 24px;

        @media (max-width: 1100px) {
            width: 75px;
            height: 75px;
        }

        @media (max-width: 530px) {
            margin: 0 0 20px;
        }
    }

    &:hover {
        transform: translateY(-2px);
        color: var(--black);
        box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
    }

    &:active {
        transform: translateY(2px);
    }

    @media (max-width: 530px) {
        flex-direction: column;
        text-align: center;
    }
`;
