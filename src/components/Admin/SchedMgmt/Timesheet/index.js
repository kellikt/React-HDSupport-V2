import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Heading from './Heading';
import { LayoutContext } from '../../../../LayoutContext';
import Timesheet from './Timesheet';
import MetricsTable from '../ClockMetrics/MetricsTable';

class Index extends Component {
    state = {
        user: {},
        partial: {},
        weekOne: {},
        weekTwo: {},
        weekThree: {},
        grandTotals: [],
    };

    getUserInfo = async () => {
        const { username, payPeriod, year } = this.props;

        try {
            const request = axios.post('/search-user.php', {
                username: username,
                uuid: '',
                firstName: '',
                lastName: '',
            });
            const timesheetRequest = axios.post('/get-timesheet-info.php', {
                payPeriod: payPeriod,
                year: year,
                username: username,
            });
            const responses = await Promise.all([request, timesheetRequest]);
            this.setState({
                user: responses[0].data[0],
                partial: responses[1].data[3],
                weekOne: responses[1].data[0],
                weekTwo: responses[1].data[1],
                weekThree: responses[1].data[2],
                grandTotals: responses[1].data[4],
            });
        } catch (error) {
            console.log(error);
        }
    };

    async componentDidMount() {
        let value = this.context;
        const { changeSize } = value;
        changeSize();

        this.getUserInfo();
    }

    componentWillUnmount() {
        let value = this.context;
        const { changeSize } = value;
        changeSize();
    }

    render() {
        const { year, payPeriod, username } = this.props;
        const { user, partial, weekOne, weekTwo, weekThree, grandTotals } = this.state;
        const weeks = [weekOne, weekTwo, weekThree];

        return (
            <Container>
                <Heading
                    name={`${user.first_name} ${user.last_name}`}
                    year={year}
                    payPeriod={payPeriod}
                    username={username}
                    partialHours={partial.partial_week_hours_parsed}
                />
                <InfoContainer>
                    <Timesheet weeks={weeks} totals={grandTotals} username={username} />
                    <MetricsTable student={username} year={year} payPeriod={payPeriod} />
                </InfoContainer>
            </Container>
        );
    }
}

Index.contextType = LayoutContext;
Index.propTypes = {
    username: PropTypes.string,
    year: PropTypes.string,
    payPeriod: PropTypes.string,
};

export default Index;

const Container = styled.main`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const InfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-column-gap: 30px;

    .tableRow {
        border-top: none;
        padding: 12px 18px;

        &:nth-of-type(odd) {
            border-top: 3px solid #e4ebf4;
        }
    }

    .striped {
        background: #f6fafd;
    }
`;
