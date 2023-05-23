import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import { Table, TableLabel, TableHeading, TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';
import ExpandedRow from './ExpandedRow';

import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';

function ViewLeaveTable(props) {
    const [focus, setFocus] = useState(-1);

    const handleRowClick = index => {
        setFocus(index);
    };

    const handleEdit = async (lid, beginDate, endDate, comment, status, staffComment) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-leave-request.php`, {
                lid: lid,
                beginDate: beginDate,
                endDate: endDate,
                comment: comment,
                status: status,
                staffComment: staffComment,
            });
            setFocus(-1);

            props.getTableData();
        } catch (error) {
                console.log(error);
        }  
    }

    const handleDelete = async lid => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-leave-request.php`, {
                lid: lid,
            });

            props.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Table {...props}
            initial={{
                y: 50,
                opacity: 0,
            }} 
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    when: 'beforeChildren',
                    ease: 'circOut',
                    duration: 0.5,
                },
            }}
            exit={{
                y: 50,
                opacity: 0,
                transition: { ease: 'circOut', duration: 0.5 },
            }}
            >
            <Label>
                <div>
                    <h2>Requests for: <strong>{props.date[0]} - {props.date[1]}</strong></h2>
                </div>
            </Label>
            <Heading>
                <span>Begin Date</span>
                <span>End Date</span>
                <span>Comment</span>
                {focus === -1 ? <span>Approval Status</span> 
                : 
                <span>Action</span>
                }
            </Heading>
            {props.results.map((result, index) => {
                if (index === focus && result.status == 0) {
                    return (
                        <ExpandedRow 
                            key={result.lid}
                            comment={result.comment}
                            staffComment={result.staff_comment}
                            beginDate={result.begin_date}
                            endDate={result.end_date}
                            status={result.status}
                            lid={result.lid}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    );
                } else {
                    return (
                        <Row key={result.lid} onClick={() => handleRowClick(index)} stagger={index}>
                            <span>{result.begin_date}</span>
                            <span>{result.end_date}</span>
                            <span>{result.comment}</span>
                            <span>{function() {
                                switch(result.status) {
                                    case 0:
                                        return <p>?<br/>{result.staff_comment.length > 0 ? `Manager comment: ${result.staff_comment}`  : ''}</p>;
                                    case 1:
                                        return <p><Cross /><br/>{result.staff_comment.length > 0 ? `Manager comment: ${result.staff_comment}`  : ''}</p>;
                                    case 2:
                                        return <p><LeaveCheck /><br/>{result.staff_comment.length > 0 ? `Manager comment: ${result.staff_comment}`  : ''}</p>;
                                    default:
                                        return <p>?<br/>{result.staff_comment.length > 0 ? `Manager comment: ${result.staff_comment}`  : ''}</p>;
                                }
                            }()}</span>
                        </Row>
                    );
                }
            })}
        </Table>
    );

}

export default ViewLeaveTable;

const Label = styled(TableLabel)`
    background: var(--blue-button);
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Row = styled(TableRow)`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    transition: transform 0.25s ease-out, box-shadow 0.1s ease-out;
    padding: 24px 18px;
    &:hover {
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        transform: scale(1.03);
        cursor: pointer;
    }

    &:active {
        transform: scale(1);
    }

    span:nth-of-type(4) {
        text-align: center;
    }
`;

const LeaveCheck = styled(Check)`
    width: 25px;
`;
