import styled from 'styled-components';

export const FormEl = styled.form`
    padding: 30px 30px 30px 260px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    background: var(--white);
    position: relative;
    display: grid;
    grid-row-gap: 18px;
    grid-template-columns: 1fr;

    > svg {
        position: absolute;
        height: 317px;
        top: -15px;
        left: -78px;
    }

    > button {
        justify-self: end;
        text-transform: uppercase;
    }
`;

export const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--light-blue);
    }

    p {
        margin: 0;
        color: var(--dark-grey);
    }
`;

export const Inputs = styled.div`
    display: flex;
    margin-top: 12px;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 8px;
    }

    > div {
        width: 100%;
        margin: 0 6px;
        display: flex;
        flex-direction: column;

        &:first-of-type {
            margin-left: 0;
            width: 66%;
        }

        &:nth-of-type(2) {
            width: 33%;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }
`;
