import React from 'react';
import styled from 'styled-components';

const Background = props => {
    return (
        <Container>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span className="white" />
        </Container>
    );
};

export default Background;

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -5;

    --content-column-width: minmax(0, calc(1040px / var(--content-columns)));
    --content-columns: 12;
    --gutter-columns: 4;
    --gutter-column-width: 1fr;
    display: grid;
    grid-template-rows: repeat(16, 64px);
    grid-template-columns:
        [viewport-start] 1fr [left-gutter-start] repeat(var(--gutter-columns), var(--gutter-column-width))
        [left-gutter-end content-start] repeat(var(--content-columns), var(--content-column-width))
        [content-end right-gutter-start] repeat(var(--gutter-columns), var(--gutter-column-width))
        [right-gutter-end] 1fr [viewport-end];
    background-color: #f6f9fc;

    @media (min-width: 1040px) {
        --gutter-column-width: var(--content-column-width);
        min-width: calc(
            1040px / var(--content-columns) * (var(--gutter-columns) * 2 + var(--content-columns))
        );
    }

    span.white {
        grid-row: 11 / -1;
        grid-column: 1 / -1;
        z-index: -1;
        background: var(--white);
    }

    span {
        &:nth-of-type(1) {
            grid-row: 2;
            grid-column: 2 / span 2;
            background-color: #e6ebf1;
        }
        &:nth-of-type(2) {
            grid-row: 3;
            grid-column: 1 / span 2;
            background-color: #b7a889;
        }
        &:nth-of-type(3) {
            grid-row: 10;
            grid-column: viewport-start / span 3;
            background-color: #74bce4;
        }
        &:nth-of-type(4) {
            grid-row: 10;
            grid-column: 4 / span 2;
            background-color: #005381;
        }
        &:nth-of-type(5) {
            grid-row: 11;
            grid-column: 2 / span 3;
            background-color: #cff1fa;
        }
        &:nth-of-type(6) {
            grid-row: 12;
            grid-column: 19 / span 3;
            background-color: #e6ebf1;
        }
        &:nth-of-type(7) {
            grid-row: 13;
            grid-column: 17 / viewport-end;
            background-color: #005381;
        }
        &:nth-of-type(8) {
            grid-row: 14;
            grid-column: 20 / span 3;
            background-color: #cff1fa;
        }
        &:nth-of-type(9) {
            grid-row: 15;
            grid-column: 19 / span 4;
            background-color: #74bce4;
        }
        &:nth-of-type(10) {
            grid-row: 7;
            grid-column: 18 / span 3;
            background-color: #e6ebf1;
        }
        &:nth-of-type(11) {
            grid-row: 6;
            grid-column: 17 / span 3;
            border: 2px solid #e6ebf1;
            position: relative;
            top: 2px;
        }
    }
`;
