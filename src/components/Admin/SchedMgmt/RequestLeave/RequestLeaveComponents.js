import styled from 'styled-components';

export const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 18px;
    grid-row-gap: 30px;
    align-items: center;

    textarea {
        grid-column: 1/-1;
    }
    
    button {
        grid-column: 2;
        margin-right: 0;
        margin-left: auto;
        width: 50%;
    }
`;

export const Title = styled.div`
h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 4px;
    color: var(--red);
}

p {
    margin: 0;
    color: var(--dark-grey);
}
`;