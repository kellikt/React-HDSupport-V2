import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
    Table,
    TableLabel,
    TableHeading,
    TableRow,
    Timestamp,
    Comments,
    Location,
} from './MetricsTableComponents';
import { ReactComponent as TableLogo } from '../../../images/Admin/Sched/Table.svg';
import { ReactComponent as Check } from '../../../images/icons/GreenCheck.svg';
import { ReactComponent as X } from '../../../images/icons/RedCross.svg';

class MetricsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    async componentDidMount() {
        const { student, year, payPeriod } = this.props;
        const splitDate = payPeriod.split(',');

        try {
            const request = await axios.post('/get-clock-metrics.php', {
                username: student,
                year: year,
                month: Number.parseInt(splitDate[0], 10),
                startDay: Number.parseInt(splitDate[1], 10),
                endDay: Number.parseInt(splitDate[2], 10),
            });
            const data = await request.data;

            this.setState({
                results: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { student, year, payPeriod } = this.props;
        const { results } = this.state;
        const splitDate = payPeriod.split(',');

        return (
            <Table {...this.props}>
                <TableLabel>
                    <TableLogo />
                    <div>
                        <h2>
                            Results for: <strong>{student}</strong>
                        </h2>
                        <span>
                            {`${splitDate[0]}/${splitDate[1]}/${year} - ${splitDate[0]}/${
                                splitDate[2]
                            }/${year}`}
                        </span>
                    </div>
                </TableLabel>
                <TableHeading>
                    <span>Timestamp</span>
                    <span>Comments</span>
                    <span>Location Okay?</span>
                </TableHeading>

                {results.map(result => {
                    let locationFlag = false;
                    if (!result.ip.includes('128.171')) {
                        locationFlag = true;
                    }

                    return (
                        <TableRow key={result.logid}>
                            <Timestamp in={result.action}>
                                <h4>{`${result.hour}:${result.min} ${result.ampm}`}</h4>
                                <span>{`${result.month}/${result.day}/${year}`}</span>
                            </Timestamp>
                            <Comments>{result.comments}</Comments>
                            <Location>{locationFlag ? <X /> : <Check />}</Location>
                        </TableRow>
                    );
                })}
            </Table>
        );
    }
}

MetricsTable.propTypes = {
    student: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    payPeriod: PropTypes.string.isRequired,
};

export default MetricsTable;
