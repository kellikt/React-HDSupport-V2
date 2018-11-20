import React from 'react';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
    0% { transform: scale(0); opacity: 0; }
    5% { opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
`;

const SpinnerContainer = styled.span`
    display: inline-block;
    width: ${props => `${props.loaderSize}px`};
    height: ${props => `${props.loaderSize}px`};
    margin-right: '.25rem';
    position: relative;
    top: 4px;
    margin-left: 18px;
    left: -4px;
    grid-column: 1/-1;
    grid-row: 1/-1;
    align-self: center;
    justify-self: center;
    margin: ${props => `${props.margin}px 0`};

    span:nth-child(2) {
        animation-delay: -0.8s;
    }

    span:nth-child(3) {
        animation-delay: -0.4s;
    }
`;

const SpinnerBall = styled.span`
    background-color: var(--light-blue);
    border-radius: 100%;
    animation-fill-mode: both;
    position: absolute;
    opacity: 0;
    margin: 0;
    width: ${props => `${props.loaderSize}px`};
    height: ${props => `${props.loaderSize}px`};
    animation: ${scale} 1s 0s linear infinite;
`;

const Spinner = props => {
    const { size, margin } = props;

    return (
        <SpinnerContainer loaderSize={size} margin={margin}>
            <SpinnerBall loaderSize={size} />
            <SpinnerBall loaderSize={size} />
            <SpinnerBall loaderSize={size} />
            <SpinnerBall loaderSize={size} />
        </SpinnerContainer>
    );
};

export default Spinner;
