import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { ReactComponent as RedX } from '../../../images/icons/RedCross.svg';
import { ReactComponent as GreenCheck } from '../../../images/icons/GreenCheck.svg';

const SearchResult = ({ result }) => {
    return (
        <ResultTable>
            <TableHeader>
                <h6>Name</h6>
                <h6>Username</h6>
                <h6>Employ Date</h6>
                <h6>Status</h6>
            </TableHeader>
            {result.map(item => {
                return (
                    <TableRow key={item.uuid} to={`/acctmgmt/edituser/${item.username}`}>
                        <NameAndID>
                            <h3>{`${item.first_name} ${item.last_name}`}</h3>
                            <span>{item.uuid}</span>
                        </NameAndID>
                        <Username>{item.username}</Username>
                        <EmployDate>{item.date_of_employ}</EmployDate>
                        {item.expired ? <RedX /> : <GreenCheck />}
                    </TableRow>
                );
            })}
        </ResultTable>
    );
};

SearchResult.propTypes = {
    result: PropTypes.array.isRequired,
};

export default SearchResult;

const ResultTable = styled.div`
    display: grid;
    background: #fff;
    border-radius: 8px;
    margin-top: 30px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
`;

const TableRow = styled(Link)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 12px;
    align-items: center;
    background: #fff;
    padding: 18px;
    border-top: 3px solid #e4ebf4;
    transition: transform 0.25s ease-out, box-shadow 0.1s ease-out;
    color: inherit;

    &:hover {
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        transform: scale(1.03);
        cursor: pointer;
    }

    &:active {
        transform: scale(1);
    }

    &:last-of-type {
        border-radius: 0 0 8px 8px;
    }

    svg {
        width: 20px;
        height: 20px;
        justify-self: center;
    }
`;

const NameAndID = styled.div`
    display: flex;
    flex-direction: column;

    h3 {
        font-size: 17px;
        font-weight: 600;
        margin: 0;
    }

    span {
        font-size: 14px;
        font-weight: 400;
        color: var(--dark-grey);
    }
`;

const EmployDate = styled.div`
    text-align: right;
    font-weight: 600;
`;

const Username = styled.div`
    text-align: left;
    font-weight: 600;
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 12px;
    align-items: center;
    color: var(--black);
    background: #ebf1f8;
    padding: 18px;
    border-radius: 8px 8px 0 0;
    border-top: 3px solid #e4ebf4;

    h6 {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
        margin: 0;

        &:nth-of-type(1),
        &:nth-of-type(2) {
            text-align: left;
        }

        &:nth-of-type(3) {
            text-align: right;
        }

        &:nth-of-type(4) {
            text-align: center;
        }
    }
`;
