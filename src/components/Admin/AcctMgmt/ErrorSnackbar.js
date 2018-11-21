import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

class ErrorSnackbar extends Component {
    render() {
        const { errMessage, onClick, error } = this.props;

        return (
            <PoseGroup>
                {error && (
                    <StyledContainer key="snack">
                        <div>
                            <h4>Error!</h4>
                            <p>{errMessage}</p>
                        </div>
                        <button onClick={onClick}>Dismiss</button>
                    </StyledContainer>
                )}
            </PoseGroup>
        );
    }
}

ErrorSnackbar.propTypes = {
    error: PropTypes.bool.isRequired,
    errMessage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ErrorSnackbar;

const Container = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'circOut',
            default: { duration: 300 },
        },
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: { ease: 'circOut', duration: 300 },
    },
});

const StyledContainer = styled(Container)`
    position: absolute;
    bottom: 20px;
    right: 40px;
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
        color: var(--red);
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 30px;
        font-weight: bold;
        font-size: 16px;
        transition: color 0.15s ease;
        outline: none;

        &:hover {
            color: #fc677c;
        }
    }
`;
