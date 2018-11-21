import styled, { keyframes } from 'styled-components';

export const FormEl = styled.form`
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 18px;
    grid-row-gap: 18px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;

    button {
        text-transform: uppercase;
        grid-column: 2;
    }
`;

export const Title = styled.div`
    grid-column: 1/-1;

    h1 {
        font-size: 28px;
        margin: 0 0 4px;
        color: #7a5dbf;
    }
    p {
        margin: 0;
        color: var(--dark-grey);
    }
`;

export const UHSearch = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;

    h2 {
        color: var(--dark-grey);
        font-style: italic;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
    }

    svg {
        height: 80px;
        margin: 12px auto 12px;
    }
`;
export const PIISearch = styled(UHSearch)``;

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const ErrorSnackbar = styled.div`
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
    animation: ${fadeUp} 0.25s ease-out;

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
