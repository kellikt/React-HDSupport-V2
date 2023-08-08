import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Title } from '../ViewLeave/ViewLeaveComponents';
import { RequestInputs, RequestDateRangerPicker } from '../RequestLeave/RequestLeaveComponents';

import Button from '../../../Button';

function AdminViewLeaveOptions(props) {
    return (
        <FormEl
            key={props.lpid}
            initial={{
                y: 50,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
                delay: 0.3,
                transition: {
                    duration: 0.3,
                    ease: 'easeIn',
                },
            }}
            exit={{
                y: 50,
                opacity: 0,
                transition: { ease: 'circOut', duration: 0.2 },
            }}
            onSubmit={props.handlePeriodSubmit}
        >
            <ViewTitle>
                <h2>Leave Period Options</h2>
                <p>Adjust the start/end date of the leave request submission period.</p>
            </ViewTitle>
            <ViewInputs color="light-blue">
                <h3>Date Range:</h3>
                <RequestDateRangerPicker onChange={props.handleDate} value={props.periodDates} calendarType="US" />
            </ViewInputs>
            <Button color="light-blue">Update Leave Period</Button>
        </FormEl>
    );
}

export default AdminViewLeaveOptions;

const FormEl = styled(motion.form)`
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

        > svg {
            display: none;
        }

        button {
            grid-column: 1;
        }
    }
`;

const ViewTitle = styled(Title)`
    grid-column: 1/-1;
    h2 {
        color: var(--light-blue);
    }
`;

const ViewInputs = styled(RequestInputs)`
    h3 {
        color: var(--light-blue);
    }
`;
