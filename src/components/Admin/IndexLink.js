import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const IndexLink = ({ color, children, title, description, to }) => {
    return (
        <IndexLinkEl color={color} to={to}>
            {children}
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </IndexLinkEl>
    );
};

IndexLink.propTypes = {
    to: PropTypes.string.isRequired,
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default IndexLink;

const IndexLinkEl = styled(Link)`
    display: grid;
    padding: 30px 15px;
    background: var(--white);
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    color: ${({ color }) => (color ? `var(--${color})` : 'var(--blue)')};
    grid-template-columns: 0.6fr 1fr;
    grid-column-gap: 12px;
    align-items: center;
    justify-items: center;
    transition: all 0.15s ease-out;

    &:hover {
        transform: translateY(-3px);
        color: var(--black);
    }
    &:active {
        transform: translateY(3px);
    }

    svg {
        max-height: 140px;
        max-width: 180px;
        width: 100%;
    }

    h2 {
        font-size: 28px;
        margin: 0 0 4px;
    }

    p {
        margin: 0;
        color: var(--dark-grey);
        line-height: 1.5;
    }
`;
