import React from "react";
import styled from "@emotion/styled";
import { Table, TableLabel, TableHeading, TableRow } from "../../SchedMgmt/ClockMetrics/MetricsTableComponents";
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';

export const ConflictTable = (props) => {

    return (
        <StyledTable
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
        exit={{
            y: 50,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        }}
        >
            <Label>
                <div>
                    <h2>Conflicts for {props.beginDate} - {props.endDate}</h2>
                </div>
            </Label>
            <ConflictHeading>
                <span>Name</span>
                <span>Priority</span>
                <span>Begin Date</span>
                <span>End Date</span>
                <span>Lower Priority?</span>
            </ConflictHeading>
            {props.conflict.map((c) => {
                return (
                <ConflictRow>
                    <span>{c.first_name} {c.last_name}</span>
                    <span>{c.priority}</span>
                    <span>{c.begin_date}</span>
                    <span>{c.end_date}</span>
                    <span>{props.priority > c.priority ? <Cross /> : <Check />}</span>
                </ConflictRow> 
                );  
            })}
        </StyledTable>
    );
}

const Label = styled(TableLabel)`
    background: var(--gold-button);
`;

const StyledTable = styled(Table)`
    max-width: 1200px;
    margin: 30px auto 30px auto;
    width: 100%;
`;

const ConflictHeading = styled(TableHeading)`
    grid-template-columns: 1.25fr 1fr 1fr 1fr 1.25fr;
`;

const ConflictRow = styled(TableRow)`
    grid-template-columns: 1.25fr 1fr 1fr 1fr 1.25fr;

    span:nth-of-type(5) {
        width: 30px;
    } 
`;