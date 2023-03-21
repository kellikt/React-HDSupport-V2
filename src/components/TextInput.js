import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TextInput = ({ id, label, placeholder, value, onChange, name }, props) => {
    return (
        <Container className="styled-input">
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                {...props}
            />
        </Container>
    );
};

TextInput.defaultProps = {
    label: '',
};

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
};

export default TextInput;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 12px 0;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    input {
        border-radius: 15px;
        padding: 15px;
        font-size: 14px;
        background-color: #f1f3f6;
        color: var(--black);
        transition: all 0.15s ease;
        border: 2px solid #f1f3f6;
        width: 100%;

        &:active,
        &:focus {
            background: transparent;
        }
    }
`;
