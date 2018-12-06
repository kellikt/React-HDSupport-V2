import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

class Snackbar extends Component {
    render() {
        const { heading, message, onClick, handler, isError } = this.props;

        return (
            <PoseGroup>
                {handler && (
                    <StyledContainer key="snack" isError={isError}>
                        <div>
                            <h4>{heading}</h4>
                            <p>{message}</p>
                        </div>
                        <button type="button" onClick={onClick}>
                            Dismiss
                        </button>
                    </StyledContainer>
                )}
            </PoseGroup>
        );
    }
}

Snackbar.propTypes = {
    handler: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isError: PropTypes.bool,
};

export default Snackbar;

const Container = posed.div({
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'circOut',
            default: { duration: 300 },
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: { ease: 'circOut', duration: 300 },
    },
});

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    background-color: #282c34;
    color: var(--white);
    padding: 18px 24px;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
        0 8px 10px -5px rgba(0, 0, 0, 0.2);
    display: flex;

    h4 {
        margin: 0 0 4px;
        font-size: 18px;
    }

    p {
        margin: 0;
        font-weight: 400;
        font-size: 14.5px;
    }

    button {
        color: ${props => (props.isError ? 'var(--red)' : 'var(--green)')};
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 30px;
        font-weight: bold;
        font-size: 16px;
        transition: color 0.15s ease;
        outline: none;

        &:hover {
            color: ${props => (props.isError ? '#fc677c' : '#29d997')};
        }
    }
`;
