import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Checkbox = ({ id, label, onChange, checked, name, color, disabled }, props) => {
    return (
        <CheckboxEl color={color} isDisabled={disabled}>
            <input
                type="checkbox"
                id={id}
                onChange={onChange}
                checked={checked}
                name={name}
                disabled={disabled}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </CheckboxEl>
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default Checkbox;

const CheckboxEl = styled.div`
    margin: 6px 0;
    opacity: ${props => (props.isDisabled ? '.7' : '1')};

    [type='checkbox'] + label {
        position: relative;
        padding-left: 2em;
        cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
        display: inline-block;
        height: 25px;
        font-size: 16px;
        margin-right: 12px;
        user-select: none;
        -moz-user-select: none;
        color: #32325d;
    }

    [type='checkbox'] + label::before {
        content: '';
        position: absolute;
        top: -3px;
        left: 0;
        width: 20px;
        height: 20px;
        z-index: 0;
        border: 2px solid #666;
        border-radius: 1px;
        margin-top: 4px;
        transition: 0.2s;
    }

    [type='checkbox']:checked + label::before {
        top: -6px;
        left: -4px;
        width: 13px;
        height: 21px;
        border-top: 2px solid #0000;
        border-left: 2px solid #0000;
        border-right: 2px solid
            ${({ color, isDisabled }) => (color ? `var(--${color})` : isDisabled ? 'var(--dark-grey)' : `#06d19c`)};
        border-bottom: 2px solid
            ${({ color, isDisabled }) => (color ? `var(--${color})` : isDisabled ? 'var(--dark-grey)' : `#06d19c`)};
        transform: rotate(40deg);
        backface-visibility: hidden;
        transform-origin: 100% 100%;
    }

    [type='checkbox']:checked,
    [type='checkbox']:not(:checked) {
        position: absolute;
        visibility: hidden;
    }

    [type='checkbox'] {
        padding: 0;
    }
`;
