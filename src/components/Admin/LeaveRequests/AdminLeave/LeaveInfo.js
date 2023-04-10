import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import TextInput from '../../../TextInput';
import { ConflictBox } from './AdminLeaveComponents';

import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg'; 
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';

export default function LeaveInfo(props) {

    const renderConflictStatus = (conflict) => {
        if (conflict.length > 0) {
            return (
                <React.Fragment>
                    <Cross />
                    <p>Conflicts Exist</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Check />
                    <p>No Conflicts</p>
                </React.Fragment>
            );
        }
    }

    return (
        <Container
        key={props.lid}
        initial={{
            y: 50,
            opacity: 0,
        }}
        animate={{
            y: 0,
            opacity: 1,
            delay: 0.8,
            transition: {
                duration: 0.8,
                ease: 'easeIn',
            },
        }}
        >
            <ConflictBox>
                {renderConflictStatus(props.conflict)}
            </ConflictBox>
            <h2>Leave Info</h2>
            <p>Information about the current leave request</p>
            <RequestedLeave>
                <h3>Requested Leave:</h3>
                <TextInput 
                    id="startDate"
                    label="Start Date"
                    value={props.startDate}
                    name="startDate"
                    disabled
                />
                <Dash>
                -
                </Dash>
                <TextInput 
                    id="endDate"
                    label="End Date"
                    value={props.endDate}
                    name="endDate"
                    disabled
                />
            </RequestedLeave>
            <Comment>
                <label>Leave Comments</label>
                <textarea disabled value={props.comment}/>
            </Comment>
        </Container>
    );
}

const Container = styled(motion.div)`
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    margin-top: 24px;
    padding: 10px 30px 30px 30px;
    border-top: 6px solid #6772e5;
    background: var(--white);

    h2 {
        font-weight: 700;
        color: var(--blue);
    }

    p {
        color: var(--dark-grey);
    }
`;

const Dash = styled.div`
    line-height: 120px;
    text-align: center;
`;

const RequestedLeave = styled.div`
    h3 {
        text-transform: uppercase;
        margin: 0;
        font-size: 20px;
        color: var(--blue);
        line-height: 6;

        @media only screen and (max-width: 1430px) {
            grid-column: 1/5;
        }
    }
    display: grid;
    grid-template-columns: 1fr 1fr 0.1fr 1fr;

    @media only screen and (max-width: 1430px) {
        grid-template-columns: 1fr 0.1fr 1fr;
    }
`;

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    label {
        line-height: 1;
        font-weight: 400;
        font-size :14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        border-radius: 15px;
        padding: 15px;
    }
`;