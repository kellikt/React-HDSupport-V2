import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Background = ({ color, yOffset }) => {
    return (
        <Container color={color} yOffset={yOffset}>
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

Background.propTypes = {
    color: PropTypes.string,
    yOffset: PropTypes.number,
};

Background.defaultProps = {
    yOffset: 0,
};

export default Background;

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${({ yOffset }) => yOffset}px;
    left: 0;
    z-index: -5;
    opacity: 0.65;

    --content-column-width: minmax(0, calc(1040px / var(--content-columns)));
    --content-columns: 12;
    --gutter-columns: 4;
    --gutter-column-width: 1fr;
    display: grid;
    grid-template-rows: repeat(19, 64px);
    grid-template-columns:
        [viewport-start] 1fr [left-gutter-start] repeat(var(--gutter-columns), var(--gutter-column-width))
        [left-gutter-end content-start] repeat(var(--content-columns), var(--content-column-width))
        [content-end right-gutter-start] repeat(var(--gutter-columns), var(--gutter-column-width))
        [right-gutter-end] 1fr [viewport-end];
    background-color: #f6f9fc;

    @media (min-width: 1040px) {
        --gutter-column-width: var(--content-column-width);
        min-width: calc(1040px / var(--content-columns) * (var(--gutter-columns) * 2 + var(--content-columns)));
    }

    span.white {
        grid-row: 11 / -1;
        grid-column: 1 / -1;
        z-index: -1;
        background: var(--white);
    }

    span {
        &:nth-of-type(1) {
            grid-row: ${({ color }) =>
                color === 'green' ? '6' : color === 'purple' ? '3' : color === 'blue' ? '4' : '2'};
            grid-column: ${({ color }) =>
                color === 'green' || color === 'purple'
                    ? 'viewport-start / 3'
                    : color === 'blue'
                    ? '2/5'
                    : '2 / span 2'};
            background-color: ${({ color }) =>
                color === 'green' || color === 'purple' || color === 'blue' ? null : '#e6ebf1'};
            border: ${({ color }) =>
                color === 'green' || color === 'purple' || color === 'blue' ? '2px solid #e6ebf1' : null};
            position: relative;
        }
        &:nth-of-type(2) {
            grid-row: ${({ color }) =>
                color === 'green' ? '7' : color === 'purple' ? '4' : color === 'blue' ? '11' : '3'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? 'viewport-start/4'
                    : color === 'purple'
                    ? 'viewport-start / 5'
                    : color === 'blue'
                    ? 'viewport-start / span 3'
                    : '1 / span 2'};
            background-color: ${({ color }) =>
                color === 'green' ? '#e6ebf1' : color === 'purple' ? '#e6ebf1' : color === 'blue' ? '#6672e5' : null};
            border: ${({ color }) => (color === 'green' || color === 'blue' ? null : '2px solid #e6ebf1')};
            position: relative;
            top: ${({ color }) => (color === 'green' || color === 'blue' ? null : '-2px')};
        }
        &:nth-of-type(3) {
            grid-row: ${({ color }) =>
                color === 'green'
                    ? '10'
                    : color === 'purple' || color === 'blue'
                    ? '11'
                    : color === 'gold'
                    ? '9'
                    : '10'};
            grid-column: ${({ color }) =>
                color === 'green' || color === 'purple'
                    ? '2 / 4'
                    : color === 'blue'
                    ? '-6 / span 3'
                    : color === 'gold'
                    ? '3 / 6'
                    : 'viewport-start / span 3'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#d6facf'
                    : color === 'purple'
                    ? '#d95c6e'
                    : color === 'blue'
                    ? '#e6ebf1'
                    : color === 'gold'
                    ? '#e39f48'
                    : '#74bce4'};
        }
        &:nth-of-type(4) {
            grid-row: ${({ color }) => (color === 'green' ? '11' : color === 'purple' ? '12' : '10')};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? 'viewport-start / 6'
                    : color === 'purple'
                    ? 'viewport-start / 5'
                    : color === 'blue'
                    ? 'viewport-start / span 5'
                    : color === 'gold'
                    ? '1 / span 3'
                    : '4 / span 2'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#008169'
                    : color === 'purple'
                    ? '#44278a'
                    : color === 'blue'
                    ? '#32335c'
                    : color === 'gold'
                    ? '#fde8cc'
                    : '#005381'};
        }
        &:nth-of-type(5) {
            grid-row: ${({ color }) =>
                color === 'green' ? '12' : color === 'purple' ? '13' : color === 'blue' ? '9' : '11'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '3 / 5'
                    : color === 'purple'
                    ? '3/7'
                    : color === 'blue'
                    ? '20 / viewport-end'
                    : '2 / span 3'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#ffcca5'
                    : color === 'purple'
                    ? '#cfc9de'
                    : color === 'blue'
                    ? '#32335c'
                    : color === 'gold'
                    ? '#9e7540'
                    : '#cff1fa'};
        }
        &:nth-of-type(6) {
            grid-row: ${({ color }) =>
                color === 'green' ? '18' : color === 'purple' ? '10' : color === 'blue' ? '5' : '12'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '-4 / -2'
                    : color === 'purple'
                    ? '19 / viewport-end'
                    : color === 'blue'
                    ? 'viewport-start / 5'
                    : color === 'gold'
                    ? '18 / span 3'
                    : '19 / span 3'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#e6ebf1'
                    : color === 'purple'
                    ? '#d95c6e'
                    : color === 'gold'
                    ? '#9e7540'
                    : '#e6ebf1'};
        }
        &:nth-of-type(7) {
            grid-row: ${({ color }) =>
                color === 'green' ? '17' : color === 'purple' ? '7' : color === 'blue' ? '-11' : '13'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '-6 / -4'
                    : color === 'purple'
                    ? '21/23'
                    : color === 'blue'
                    ? '19 / span 3'
                    : '17 / viewport-end'};
            background-color: ${({ color }) =>
                color === 'green' || color === 'purple'
                    ? null
                    : color === 'blue'
                    ? '#6672e5'
                    : color === 'gold'
                    ? '#e39f48'
                    : '#005381'};
            border: ${({ color }) => (color === 'green' || color === 'purple' ? '2px solid #e6ebf1' : null)};
            position: relative;
            top: ${({ color }) => (color === 'purple' ? '-2px' : null)};
        }
        &:nth-of-type(8) {
            grid-row: ${({ color }) =>
                color === 'green' ? '12' : color === 'purple' ? '6' : color === 'blue' ? '16' : '14'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '18 / 21'
                    : color === 'purple'
                    ? '18/23'
                    : color === 'blue'
                    ? '20 / span 2'
                    : '20 / span 3'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#e6ebf1'
                    : color === 'purple'
                    ? '#e6ebf1'
                    : color === 'blue'
                    ? null
                    : color === 'gold'
                    ? '#fde8cc'
                    : '#cff1fa'};
            border: ${({ color }) => (color === 'blue' ? '2px solid #e6ebf1' : null)};
            position: relative;
            top: ${({ color }) => (color === 'blue' ? '2px' : 0)};
        }
        &:nth-of-type(9) {
            grid-row: ${({ color }) =>
                color === 'green' ? '11' : color === 'purple' || color === 'blue' ? '17' : '15'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '19 / 22'
                    : color === 'purple'
                    ? '20 / viewport-end'
                    : color === 'blue'
                    ? '-5 / span 4'
                    : '19 / span 4'};
            background-color: ${({ color }) =>
                color === 'green'
                    ? '#ffcca5'
                    : color === 'purple'
                    ? '#cfc9de'
                    : color === 'blue'
                    ? '#e6ebf1'
                    : color === 'gold'
                    ? 'var(--blue)'
                    : '#74bce4'};
        }
        &:nth-of-type(10) {
            grid-row: ${({ color }) =>
                color === 'green' ? '10' : color === 'purple' ? '12' : color === 'blue' ? '9' : '7'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '15 / viewport-end'
                    : color === 'purple'
                    ? '20/viewport-end'
                    : color === 'blue'
                    ? '18 / span 2'
                    : '18 / span 3'};
            background-color: ${({ color }) =>
                color === 'green' ? '#74e4a2' : color === 'blue' ? '#fcd768' : '#e6ebf1'};
        }
        &:nth-of-type(11) {
            grid-row: ${({ color }) =>
                color === 'green' ? '6' : color === 'purple' ? '18' : color === 'blue' ? '9' : '6'};
            grid-column: ${({ color }) =>
                color === 'green'
                    ? '20 / 23'
                    : color === 'purple'
                    ? '16/viewport-end'
                    : color === 'blue'
                    ? '3 / span 2'
                    : '17 / span 3'};
            border: ${({ color }) =>
                color === 'green' || color === 'purple' || color === 'blue' ? null : '2px solid #e6ebf1'};
            background-color: ${({ color }) =>
                color === 'green' ? '#e6ebf1' : color === 'purple' ? '#44278a' : color === 'blue' ? '#fcd768' : null};
            position: relative;
            top: ${({ color }) => (color === 'green' || color === 'purple' || color === 'blue' ? null : '2px')};
        }
    }
`;
