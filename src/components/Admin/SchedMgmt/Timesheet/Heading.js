import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../../../Button';

const parsePayPeriod = (payPeriod, year) => {
    const splitDate = payPeriod.split(',');
    const dates = [
        new Date(Date.parse(`${splitDate[0]}/${splitDate[1]}/${year}`)),
        new Date(Date.parse(`${splitDate[0]}/${splitDate[2]}/${year}`)),
    ];

    return dates;
};

const Heading = props => {
    const { name, year, payPeriod, partialHours } = props;
    const dates = parsePayPeriod(payPeriod, year);
    const month = dates[0].toLocaleString('en-US', { month: 'long' });

    return (
        <Container>
            <Top>
                <h2>{name}</h2>
                <Button color="light-blue">Show Printable Timesheet</Button>
            </Top>
            <Bottom>
                <PayPeriod>
                    <Label>Pay Period</Label>
                    <div>{`${month} ${dates[0].getDate()} - ${month} ${dates[1].getDate()}`}</div>
                </PayPeriod>
                <Year>
                    <Label>Year</Label>
                    <div>{year}</div>
                </Year>
                <Partial>
                    <Label>Hours Worked on Partial</Label>
                    <div>{partialHours} Hours</div>
                </Partial>
            </Bottom>
        </Container>
    );
};

Heading.defaultProps = {
    name: 'Loading...',
    partialHours: '--:--',
};

Heading.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    payPeriod: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    partialHours: PropTypes.string.isRequired,
};

export default Heading;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    padding: 0 20px;
    width: 100%;
    margin: 30px auto;

    h2 {
        font-size: 32px;
        font-weight: 500;
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Bottom = styled(Top)`
    padding-bottom: 20px;
    border-bottom: 2px solid #bcdaff52;
`;

const Label = styled.span`
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
    color: var(--dark-grey);
    margin-bottom: 8px;
    display: block;
`;

const PayPeriod = styled.div`
    color: var(--light-blue);
    font-size: 21px;
    font-weight: 500;

    > div {
        font-style: italic;
    }
`;

const Year = styled(PayPeriod)`
    color: var(--blue);
    text-align: center;
`;

const Partial = styled(PayPeriod)`
    color: var(--gold);
    text-align: right;
`;