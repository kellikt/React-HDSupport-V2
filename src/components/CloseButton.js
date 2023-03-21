import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as X } from '../images/icons/PlainX.svg';

const CloseButton = props => {
    return (
        <Close {...props}>
            <X />
        </Close>
    );
};

export default CloseButton;

const Close = styled.span`
    width: 50px;
    height: 50px;
    position: absolute;
    cursor: pointer;
    top: -64px;
    right: 0;
    padding: 15px;
    background: #0000;
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: all 0.25s ease;
    -webkit-tap-highlight-color: #0000;

    &:hover {
        background: #fff;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
        transform: scale(1.07);
    }

    &:active {
        transform: scale(0.93);
    }
`;
