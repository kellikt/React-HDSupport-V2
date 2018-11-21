import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    render() {
        const { id, label, placeholder, value, onChange } = this.props;

        return (
            <Container error={this.state.error}>
                <label htmlFor={id}>{label}</label>
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...this.props}
                />
            </Container>
        );
    }
}

TextInput.defaultProps = {
    label: '',
};

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
        border: 2px solid ${props => (props.error ? '#d95c6e' : '#f1f3f6')};

        &:active,
        &:focus {
            background: transparent;
        }
    }
`;
