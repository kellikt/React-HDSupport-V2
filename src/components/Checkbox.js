import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Checkbox = props => {
    const { id, label, onChange, checked } = props;

    return (
        <CheckboxEl>
            <input type="checkbox" id={id} onChange={onChange} checked={checked} />
            <label htmlFor={id}>{label}</label>
        </CheckboxEl>
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;

const CheckboxEl = styled.div`
    margin: 6px 0;

    [type='checkbox'] + label {
        position: relative;
        padding-left: 2em;
        cursor: pointer;
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
        border-right: 2px solid #06d19c;
        border-bottom: 2px solid #06d19c;
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
