import styled from 'styled-components';

export const FormEl = styled.form`
    padding: 30px 30px 30px 335px;
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
        height: 343px;
        top: -15px;
        left: -84px;

        @media (max-width: 900px) {
            display: none;
        }
    }

    > a {
        justify-self: end;
    }

    @media (max-width: 900px) {
        padding: 30px;
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
