import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Table, TableLabel, TableHeading, TableRow } from '../../Admin/SchedMgmt/ClockMetrics/MetricsTableComponents';
import { ReactComponent as TableLogo } from '../../../images/Admin/Badges/Table.svg';
import { ReactComponent as ColorIcon } from '../../../images/Admin/Badges/ColorIcon.svg';
import { ReactComponent as NoIcon } from '../../../images/Admin/Badges/NoBadge.svg';
import ExpandedRow from './ExpandedRow';

class DisplayBadgesTable extends Component {
    state = {
        results: [],
        focused: -1,
        image: ''
    };

    getTableData = async () => {
        const { badge } = this.props;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badges.php`, {
                name: badge
            });
            const data = request.data;
            if (!(data === 0)) {
                this.setState({
                    results: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleRowClick = index => {
        this.setState({
            focused: index,
        });
    };

    handleEdit = async (bid, title, hex, secondary_hex, description, link) => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-badge.php`, {
                bid: bid,
                title: title,
                hex: hex,
                hex_secondary: secondary_hex,
                description: description,
                link: link
            });

            this.setState({
                focused: -1,
            });

            this.getTableData();
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async bid => {
        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/delete-badge.php`, {
                bid: bid
            });

            this.setState(state => {
                return { ...state, results: state.results.filter(result => result.bid !== bid), focused: -1 };
            });
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        await this.getTableData();
    }

    render() {
        const { results, focused } = this.state;
        const { badge } = this.props;

        return (
            <Table {...this.props}>
                <Label>
                    <TableLogo />
                    <div>
                        <h2>
                            Results for: <strong>{badge === '' ? `All Badges` : badge}</strong>
                        </h2>
                    </div>
                </Label>
                <Heading>
                    <span>Image</span>
                    <span>Name</span>
                    <span>Description</span>
                    <span>{focused >= 0 ? 'Badge Outline/Background' : 'Badge Outline'}</span>
                    <span>{focused >= 0 ? 'Action' : 'Badge Background'}</span>
                </Heading>
                {results.map((result, index) => {
                    if (index === focused) {
                        return (
                            <ExpandedRow
                                key={result.bid}
                                link={result.link}
                                title={result.title}
                                description={result.description}
                                hex={result.hex}
                                secondaryHex={result.hex_secondary}
                                bid={result.bid}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                            />
                        );
                    } else {
                        const id = result.link.match(/[-\w]{25,}/);
                        return (
                            <Row key={result.bid} onClick={() => this.handleRowClick(index)} stagger={index}>
                                <span>{result.link !== '' ? <img width="100px" height="100px" src={`https://drive.google.com/uc?export=view&id=${id}`} alt={result.title} /> : <NoIcon /> }</span>
                                <Username>{result.title}</Username>
                                <Notes>{result.description}</Notes>
                                <div><ColorIcon fill={result.hex} /><span>{result.hex}</span></div>
                                <div><ColorIcon fill={result.hex_secondary} /><span>{result.hex_secondary}</span></div>
                            </Row>
                        );
                    }
                })}
            </Table>
        );
    }
}

DisplayBadgesTable.propTypes = {
    badge: PropTypes.string.isRequired,
};

export default DisplayBadgesTable;

const Label = styled(TableLabel)`
    background: var(--purple-button);
`;

const Heading = styled(TableHeading)`
    background: linear-gradient(180deg, #a387e5, #583aa1);
    color: var(--white); 
    grid-template-columns: 0.7fr 0.7fr 1fr 0.7fr 0.3fr;

    span {
        &:nth-of-type(4) {
            margin-right: 24px;
        }
    }
`;

const Row = styled(TableRow)`
    grid-template-columns: 0.7fr 0.7fr 1fr 0.7fr 0.3fr;
    font-weight: 500;
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

const Notes = styled.span`
    font-weight: 400;
    justify-self: left !important;
`;

const Username = styled.span`
    font-weight: 700;
`;
