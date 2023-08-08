import DateRangerPicker from '@wojtekmaj/react-daterange-picker';
import { DateInputs } from '../../SchedMgmt/ScheduleChange/ChangeFormComponents';
import styled from '@emotion/styled';

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

    @media (max-width: 500px) {
        grid-template-columns: 1fr;

        button {
            grid-column: 1;
        }
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

export const RequestInputs = styled(DateInputs)`
    h3 {
        color: var(--pink);
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const RequestDateRangerPicker = styled(DateRangerPicker)`
    z-index: 2;
    
    button:disabled {
        background-color: unset;
        color: gray;
    }
`;
