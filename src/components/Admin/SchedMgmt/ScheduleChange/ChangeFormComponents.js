import styled from 'styled-components';

export const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 18px;
    grid-row-gap: 30px;
    align-items: center;

    > svg {
        width: 100%;
        height: auto;

        @media (max-width: 900px) {
            display: none;
        }
    }

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--purple);
    }

    p {
        margin: 0 0 24px;
        color: var(--dark-grey);
    }
`;

export const Reasons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    justify-self: center;
    grid-row-gap: 24px;
    align-self: flex-end;

    h4 {
        color: var(--red);
        font-style: italic;
        font-size: 22px;
        text-align: center;
        grid-column: 1/-1;
        margin: 0;
        font-weight: 600;
    }

    button {
        margin-top: 30px;
        grid-column: 1/-1;
    }
`;

export const DateInputs = styled.div`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 18px;

    h3 {
        text-transform: uppercase;
        margin: 0;
        font-size: 20px;
        color: var(--red);
    }

    .react-daterange-picker {
        width: 100%;
    }

    .react-daterange-picker__wrapper {
        display: grid;
        grid-column-gap: 18px;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        width: 100%;
        border: none;
        cursor: pointer;
    }

    .react-daterange-picker__inputGroup {
        background: #f1f3f6;
        border-radius: 8px;
        border: 2px solid #f1f3f6;
        padding: 7px;
        transition: background 0.15s ease;

        > input {
            color: var(--dark-grey);
        }

        &:focus-within {
            background: var(--white);
        }
    }

    .react-daterange-picker__calendar-button {
        display: none;
        visibility: hidden;
    }

    .react-daterange-picker__calendar {
        width: auto;
        transform: translateX(-50%);
        left: 50%;
    }

    .react-calendar {
        border: none;
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
    }

    .react-calendar__navigation {
        justify-content: space-between;
        height: auto;
        margin: 0;
        padding: 30px;
        background: ${({ color }) => (color ? `var(--${color}-button)` : `var(--purple-button`)};
        border-radius: 6px 6px 0 0;
        align-items: center;
    }

    .react-calendar__navigation__label {
        font-size: 17px;
        flex-grow: 0 !important;
        color: var(--white);
        font-weight: 600;
        letter-spacing: 0.025em;
    }

    .react-calendar__navigation button {
        min-width: 30px;
        color: var(--white);
        transition: transform 0.25s ease-out;
        padding: 0;

        &:enabled:hover {
            background: transparent;
            transform: translateY(-2px);
        }

        &:enabled:focus {
            background: transparent;
        }
    }

    .react-calendar__navigation__arrow {
        font-size: 16px;
    }

    .react-calendar__month-view {
        padding: 30px;
    }

    .react-calendar__tile--hasActive,
    .react-calendar__tile--active {
        transition: all 0.15s ease-out;
        background: ${({ color }) => (color ? `var(--${color})` : `var(--purple`)};
        color: var(--white);

        &:enabled:hover,
        &:enabled:focus {
            background: ${({ color }) => (color ? `var(--${color})` : `var(--purple`)};
        }

        &:hover {
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    .react-calendar__tile--hasActive {
        background: ${({ color }) => (color ? `var(--${color})` : `var(--purple`)};
    }

    .react-daterange-picker__clear-button {
        display: none;
        visibility: hidden;
    }
`;
