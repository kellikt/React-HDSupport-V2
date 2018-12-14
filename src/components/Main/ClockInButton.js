import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { ReactComponent as Guy } from '../../images/Main/ClockIn.svg';
import { ReactComponent as Arrow } from '../../images/icons/Arrow.svg';

const ClockInButton = () => {
    return (
        <Container to="clock">
            <Guy />
            <div>
                <HeadingText>
                    Clock In/Out <Arrow />
                </HeadingText>
                <DescriptionText>Clock in and out for your scheduled shift or view your timesheets.</DescriptionText>
            </div>
        </Container>
    );
};

export default ClockInButton;

const Container = styled(Link)`
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease-out;
    padding: 24px 40px 24px 140px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    background-color: #fff;
    color: #2fb7e4;
    margin-top: 60px;

    &:hover {
        color: var(--black);
        transform: translateY(-2px);
        box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
    }

    &:active {
        transform: translateY(2px);
    }

    > svg {
        width: 185px;
        height: 185px;
        position: absolute;
        left: -56px;
        top: -16px;

        @media (max-width: 500px) {
            position: initial;
            width: 150px;
            height: 150px;
            margin-right: 20px;
        }
    }

    @media (max-width: 500px) {
        position: initial;
        padding: 0 20px;
        flex-direction: row;
        align-items: center;
    }
`;

const HeadingText = styled.h3`
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 12px;

    > svg {
        display: inline-block;
        width: 18px;
        height: 18px;
        position: relative;
        top: 2px;
    }
`;

const DescriptionText = styled.p`
    color: var(--dark-grey);
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
`;
