import styled from 'styled-components';

export const Container = styled.div`
    overflow: visible;
    width: 450px;
    display: block;
    position: relative;
    margin: 100px 48px 0 auto;

    p {
        margin: 0;
    }
`;

export const CardsContainer = styled.ul`
    position: relative;
    font-size: 15px;
    line-height: 25px;
    color: var(--dark-grey);

    .card0 {
        --offset-delay: 0ms;
        z-index: 90;
        transform: ${props => `translateY(${props.calc - 30}px) scale(1.07)`};

        &::after {
            opacity: 0;
        }
    }
    .card1 {
        --offset-delay: calc(var(--transition-delay) * 0.25);
        opacity: 1;
        z-index: 80;
        pointer-events: auto;
        background: #fff;
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        transform: ${props => `translateY(${props.calc}px) scale(1)`};

        > * {
            opacity: 1;
        }

        &::after {
            opacity: 0;
        }
    }
    .card2 {
        --offset-delay: calc(var(--transition-delay) * 0.5);
        opacity: 1;
        z-index: 70;
        transform: ${props => `translateY(${props.calc + 30}px) scale(0.934579)`};

        &::after {
            opacity: 1;
        }
    }
    .card3 {
        --offset-delay: calc(var(--transition-delay) * 0.75);
        opacity: 1;
        z-index: 60;
        transform: ${props => `translateY(${props.calc + 60}px) scale(0.873439)`};

        &::after {
            opacity: 0.5;
        }
    }
    .card4 {
        transform: ${props => `translateY(${props.calc + 120}px) scale(0.816298)`};
    }
`;

export const Card = styled.li`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px 20px 15px;
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transform: translateY(100%);
    transition: all var(--transition-duration);
    transition-delay: var(--offset-delay);
    transform-origin: 50% 100%;
    backface-visibility: none;
    will-change: transform;
    min-height: 150px;

    span {
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin-bottom: 7px;
        display: flex;
    }

    h3 {
        color: var(--black);
        margin: 0 12px 0 0;
        font-size: 15px;
        white-space: nowrap;
    }

    h6 {
        font-weight: 400;
        color: #8898aa;
        margin: 0;
        font-size: 15px;
    }

    p {
        margin: 0;
    }

    &::after,
    > * {
        opacity: 0;
        transition: all var(--transition-duration);
        transition-delay: var(--offset-delay);
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        pointer-events: none;
        background: linear-gradient(180deg, #fff, #e6ebf1) bottom/100% 150px repeat-x;
    }

    @media (min-width: 670px) {
        padding: 35px 40px;
    }
`;

export const NextButton = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    color: #8898aa;
    transition: color 0.1s;
    font-size: 15px;
    padding: 0;
    right: 18px;
    top: 12px;
    font-weight: 400;
    z-index: 110;

    svg {
        width: 15px;
        height: 15px;
        margin-left: 4px;
    }

    &:hover {
        color: var(--black);
    }
`;
