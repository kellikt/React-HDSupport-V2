import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import { Table, TableLabel, TableHeading, TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';
import ExpandedRow from './ExpandedRow';
import { ReactComponent as Cross } from '../../../../images/icons/RedCross.svg';
import { ReactComponent as Check } from '../../../../images/icons/GreenCheck.svg';

function DisplayAnnounceTable(props) {
    const [focus, setFocus] = useState(-1);

    const handleRowClick = (index) => {
        setFocus(index);
    };

    const handleEdit = async (anid, title, description, helpDesk, lab, openDate, closeDate) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-announcement.php`, {
                anid: anid,
                title: title,
                description: description,
                helpDesk: helpDesk,
                lab: lab,
                openDate: openDate,
                closeDate: closeDate,
            });
            setFocus(-1);

            props.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (anid) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-announcement.php`, {
                anid: anid,
            });
            props.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    const openDateString = `${props.date[0].getFullYear()}-${props.date[0].getMonth() + 1}-${props.date[0].getDate()}`;
    const closeDateString = `${props.date[1].getFullYear()}-${props.date[1].getMonth() + 1}-${props.date[1].getDate()}`;

    return (
        <Table
            {...props}
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
                    <h2>
                        Results for:{' '}
                        <strong>
                            {openDateString} - {closeDateString}
                        </strong>
                    </h2>
                </div>
            </Label>
            <Heading>
                <span>Title</span>
                <span>Description</span>
                <span>Open Date</span>
                <span>Close Date</span>
                {focus === -1 ? <span>Active?</span> : <span>Action</span>}
            </Heading>
            {props.results.map((result, index) => {
                if (index === focus) {
                    return (
                        <ExpandedRow
                            key={result.anid}
                            title={result.title}
                            description={result.description}
                            helpDesk={result.help_desk}
                            lab={result.lab}
                            openDate={result.open_date}
                            closeDate={result.close_date}
                            anid={result.anid}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    );
                } else {
                    return (
                        <Row key={result.anid} onClick={() => handleRowClick(index)} stagger={index}>
                            <span>{result.title}</span>
                            <span>{result.description}</span>
                            <span>{result.open_date}</span>
                            <span>{result.close_date}</span>
                            <span>
                                {Date.now() >= Date.parse(result.open_date) && Date.now() <= (Date.parse(result.close_date) + 86400000) ? (
                                    <ActiveCheck />
                                ) : (
                                    <ActiveCross />
                                )}
                            </span>
                        </Row>
                    );
                }
            })}
        </Table>
    );
}

export default DisplayAnnounceTable;

const Label = styled(TableLabel)`
    background: var(--cyan-button);
`;

const Heading = styled(TableHeading)`
    grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
`;

const Row = styled(TableRow)`
    grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
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
`;

const ActiveCheck = styled(Check)`
    width: 25px;
`;

const ActiveCross = styled(Cross)`
    width: 25px;
`;
