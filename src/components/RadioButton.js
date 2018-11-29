import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioButton = props => {
    const { id, label, onChange, checked, value, name } = props;

    return (
        <RadioButtonEl>
            <input type="radio" id={id} onChange={onChange} checked={checked} name={name} value={value} />
            <label htmlFor={id}>{label}</label>
        </RadioButtonEl>
    );
};

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default RadioButton;

const RadioButtonEl = styled.div`
    [type='radio'] {
        box-sizing: border-box;
        padding: 0;
    }

    [type='radio']:checked,
    [type='radio']:not(:checked) {
        position: absolute;
        visibility: hidden;
        transition: 0.28s ease;
    }

    [type='radio']:checked + label,
    [type='radio']:not(:checked) + label {
        position: relative;
        padding-left: 36px;
        cursor: pointer;
        display: inline-block;
        line-height: 18px;
        transition: 0.28s ease;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        color: var(--black);
    }

    [type='radio']:checked + label::before {
        border-radius: 50%;
        border: 2px solid #0000;
    }

    [type='radio'] + label::after,
    [type='radio'] + label::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        z-index: 0;
        transition: 0.28s ease;
    }

    [type='radio']:checked + label::after {
        border-radius: 50%;
        border: 1px solid #8867d5;
        background-color: #8867d5;
        z-index: 0;
    }

    [type='radio'] + label::after,
    [type='radio'] + label::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        z-index: 0;
        transition: 0.28s ease;
    }

    [type='radio']:not(:checked) + label::after,
    [type='radio']:not(:checked) + label::before {
        transition: 0.28s ease;
        border-radius: 50%;
        border: 2px solid #666;
    }
`;
