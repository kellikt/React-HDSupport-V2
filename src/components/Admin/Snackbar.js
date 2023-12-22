import { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

class Snackbar extends Component {
    render() {
        const { heading, message, onClick, handler, isError } = this.props;

        return (
            <AnimatePresence>
                {handler && (
                    <StyledContainer 
                    initial={{
                        y: 50,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            ease: 'circOut',
                            duration: 0.3,
                        },
                    }}
                    exit={{
                        y: 50,
                        opacity: 0,
                        transition: {
                            ease: 'circOut',
                            duration: 0.3,
                        }
                    }}
                    key="snack" isError={isError}>
                        <div>
                            <h4>{heading}</h4>
                            <p>{message}</p>
                        </div>
                        <button type="button" onClick={onClick}>
                            Dismiss
                        </button>
                    </StyledContainer>
                )}
            </AnimatePresence>
        );
    }
}

Snackbar.defaultProps = {
    isError: false,
};

Snackbar.propTypes = {
    handler: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isError: PropTypes.bool,
};

export default Snackbar;

const StyledContainer = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    background-color: #282c34;
    color: var(--white);
    padding: 18px 24px;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
        0 8px 10px -5px rgba(0, 0, 0, 0.2);

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
