import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Breadcrumb = props => {
    const { links, color } = props;

    return (
        <Container color={color}>
            <Crumbs color={color}>
                <Crumb to="/" color={color}>
                    Home
                </Crumb>
                {links.map((item, index) => {
                    return (
                        <Crumb key={index} to={item.to} color={color}>
                            {item.title}
                        </Crumb>
                    );
                })}
            </Crumbs>
        </Container>
    );
};

Breadcrumb.defaultProps = {
    links: [],
};

Breadcrumb.propTypes = {
    links: PropTypes.array.isRequired,
    color: PropTypes.string,
};

export default Breadcrumb;

const Container = styled.nav`
    display: flex;
    grid-column: 1/-1;
    border-bottom: 2px solid ${({ color }) => (color ? `var(--crumb-${color}-border)` : `var(--crumb-blue-border)`)};
`;

const Crumbs = styled.div`
    display: flex;
    position: relative;
    padding-bottom: 15px;

    &:before {
        content: '';
        position: absolute;
        height: 2px;
        background-color: ${({ color }) => (color ? `var(--crumb-${color}-bg)` : `var(--crumb-blue-bg)`)};
        width: 100%;
        left: 0;
        top: 15px;
        z-index: -1;
    }
`;

const Crumb = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 32px;
    background-color: ${({ color }) => (color ? `var(--crumb-${color}-bg)` : `var(--crumb-blue-bg)`)};
    color: ${({ color }) => (color ? `var(--crumb-${color}-text)` : `var(--crumb-blue-text)`)};
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    border-radius: 16px;
    margin: 0 12px;
    transition: all 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: inset 0 4px 6px rgba(50, 50, 93, 0.11), inset 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    @media (max-width: 600px) {
        font-size: 13px;
        line-height: 1.1;
        padding: 0 12px;
    }
`;
