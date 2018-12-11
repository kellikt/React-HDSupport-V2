import styled from 'styled-components';

export const Form = styled.form`
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    display: grid;
    margin-top: 30px;
    background: #fff;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 100px;
    margin-bottom: 30px;
`;

export const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--blue);
    }

    p {
        margin: 0;
        color: var(--dark-grey);
    }
`;

export const CurrentHolidays = styled.div`
    display: flex;
    flex-direction: column;

    button {
        margin-right: auto;
        color: var(--blue);
    }
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;

    h2,
    p {
        text-align: right;
    }

    button {
        align-self: flex-end;
        margin-top: 12px;
    }
`;

export const Text = styled.div`
    margin: 18px 0;
`;
