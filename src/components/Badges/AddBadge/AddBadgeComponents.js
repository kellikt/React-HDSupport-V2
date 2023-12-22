import styled from '@emotion/styled';

export const Form = styled.form`
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    display: grid;
    margin-top: 30px;
    background: #fff;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 60px;
    margin-bottom: 30px;

    @media (max-width: 750px) {
        grid-column-gap: 30px;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-row-gap: 30px;
    }
`;

export const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--pink);
    }

    p {
        margin: 0;
        color: var(--dark-grey);
    }
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;

    h2,
    p {
        text-align: left;
    }

    button {
        align-self: flex-end;
        margin-top: 12px;
    }
`;

export const Text = styled.div`
    margin: 18px 0;
`;

export const TextLabel = styled.label`
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
    color: var(--dark-grey);
    margin-bottom: 10px;
    padding-left: 12px;
`;

export const BadgeDiv = styled.div`
    margin-left: 1em;
    margin-top: 1em;
`;