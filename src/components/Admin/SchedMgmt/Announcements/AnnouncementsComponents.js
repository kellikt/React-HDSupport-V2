import styled from '@emotion/styled';

import { DateInputs } from '../../SchedMgmt/ScheduleChange/ChangeFormComponents';

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
        color: var(--pink);
    }
    p {
        margin: 0 0 24px;
        color: var(--dark-grey);
    }
`;

export const DisplayTitle = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--cyan);
    }
    p {
        margin: 0 0 24px;
        color: var(--dark-grey);
    }
`;

export const AnnouncementInputs = styled(DateInputs)`
    h3 {
        color: var(--pink);
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const DisplayInputs = styled(DateInputs)`
    h3 {
        color: #1698B5;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        border-radius: 15px;
        padding: 15px;
        height: 222px;
    }
`;

export const ButtonGroup = styled.div`
    text-align: center;
    margin-top: 20px;
`;

export const RoleGroups = styled.div`
    margin-top: 20px;
    
    > label {
        margin: 20px;
        font-weight: 400;
        color: var(--dark-grey);
    }
`;
