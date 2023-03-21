import styled from 'styled-components';
import { CurrentHolidays } from '../HolidayWizard/HolidayWizardComponents';
import { DateRange } from '../DisplaySchedule/DisplayChangesComponents';

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

export const CurrentWeeks = styled(CurrentHolidays)`
    > button {
        color: var(--red);
        box-shadow: 0 1px 2px 0 rgba(226, 74, 74, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
    }
`;

export const RangeInput = styled(DateRange)`
    grid-template-columns: 1fr;
    margin: 24px 0;

    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 19px;
        padding-left: 12px;
    }
`;
