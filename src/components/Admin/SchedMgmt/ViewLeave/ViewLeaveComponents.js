import styled from 'styled-components';

export const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 18px;
    grid-row-gap: 30px;
    align-items: center;

    button {
        grid-column: 2;
        margin-right: 0;
        margin-left: auto;
    }

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        
        >svg {
            display: none;
        }

        button {
            grid-column: 1;
        }
    }
`;

export const Title = styled.div`
    grid-column: 2;
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--purple);
    }
    
    p {
        margin: 0;
        color: var(--dark-grey);
    }

    @media (max-width: 800px) {
        grid-column: 1;
    }
`;

export const Inputs = styled.div`
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-gap: 10px;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 8px;
    }

    > div {
        &:first-of-type {
            grid-column: 1/4;
        }

        &:nth-of-type(2) {
            grid-column: 4;
        }
    }

    @media (max-width: 800px) {
        grid-column: 1;
    }
`;