import styled from 'styled-components';

export const FormEl = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    padding: 30px;

    span {
        color: var(--dark-grey);
        font-size: 15px;
    }

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        grid-row-gap: 30px;
    }
`;

export const Username = styled.span``;

export const InOrOut = styled.h1`
    margin: 0;
    line-height: 1;
    color: ${({ clockedIn, timedOut }) => (timedOut ? 'var(--gold)' : clockedIn ? 'var(--green)' : 'var(--red)')};
    text-transform: uppercase;
    letter-spacing: 0.035em;
    font-size: 36px;
`;

export const ClockState = styled.div`
    display: flex;
    align-items: center;

    svg {
        width: 50px;
        height: 50px;
        margin-right: 12px;
    }
`;

export const Comments = styled.div`
    grid-column: 1;
    margin-top: 36px;
    text-align: center;

    em {
        color: var(--blue);
    }

    textarea {
        font-size: 13px;
        padding: 7px 20px 7px 13px;
        line-height: 18px;
        background: #f1f3f6;
        color: var(--black);
        border-radius: 8px;
        transition: background 0.1s ease-in, color 0.1s ease-in;
        height: 120px;
        width: 100%;
        margin-top: 8px;

        &:focus {
            background: transparent;
            color: #4d4e6d;
            box-shadow: 0 0 0 1px #e4effa;
        }
    }
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RightSide = styled(LeftSide)`
    justify-content: space-between;
    align-items: center;

    svg {
        width: 100%;
        max-height: 205px;

        @media (max-width: 800px) {
            display: none;
        }
    }

    button {
        width: 70%;
        text-transform: uppercase;
        letter-spacing: 0.125em;
    }
`;
