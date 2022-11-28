import styled from 'styled-components';
import { DateInputs } from '../../Admin/SchedMgmt/ScheduleChange/ChangeFormComponents';

export const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 0.6fr 1fr;
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
        grid-template-columns: 1fr 0.7fr;
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
        color: var(--dark-blue);
    }

    p {
        margin: 0 0 24px;
        color: var(--dark-grey);
    }
`;

export const DateRange = styled(DateInputs)`
    h3 {
        color: var(--blue);
    }
`;

export const Options = styled.div`
    justify-self: center;
    align-self: end;

    h4 {
        text-align: center;
        margin: 0 0 18px;
        font-size: 18px;
        color: var(--blue);
    }

    button {
        margin-bottom: 24px;
    }
`;

export const Main = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
        margin-bottom: 24px;
    }
`;

export const Radios = styled.div`
    display: flex;

    div {
        margin: 0 0 48px;

        &:first-of-type {
            margin-right: 30px;
        }
    }
`;
