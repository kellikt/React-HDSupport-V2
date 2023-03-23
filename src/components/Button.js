import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = props => {
    return <ColoredButton {...props}>{props.children}</ColoredButton>;
};

Button.propTypes = {
    color: PropTypes.string.isRequired,
};

export default Button;

const ColoredButton = styled.button`
    color: var(--white);
    line-height: 1.5;
    padding: 0.5em 2em;
    font-weight: 600;
    transition: all 0.15s ease;
    outline: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    box-shadow: 0 1px 2px 0 rgba(74, 144, 226, 0.44), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
    background: ${({ color }) => (color ? `var(--${color}-button)` : `var(--green-button`)};
    border-radius: 6px;
    font-size: 16px;

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(1px);
    }
`;
