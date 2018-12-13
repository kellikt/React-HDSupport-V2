import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeekTotal = props => {
    const { regular, night, overtime, nightOvertime, hoursString } = props;

    return (
        <Container {...props}>
            <h2>{hoursString}</h2>
            <AllHours>
                <Hours>
                    <span>Regular</span>
                    <div>{regular}</div>
                </Hours>
                <Hours>
                    <span>Night</span>
                    <div>{night}</div>
                </Hours>
                <Hours>
                    <span>Overtime</span>
                    <div>{overtime}</div>
                </Hours>
                <Hours>
                    <span>Night Overtime</span>
                    <div>{nightOvertime}</div>
                </Hours>
            </AllHours>
        </Container>
    );
};

WeekTotal.defaultProps = {
    regular: '--:--',
    night: '--:--',
    overtime: '--:--',
    nightOvertime: '--:--',
};

WeekTotal.propTypes = {
    regular: PropTypes.string.isRequired,
    night: PropTypes.string.isRequired,
    overtime: PropTypes.string.isRequired,
    nightOvertime: PropTypes.string.isRequired,
    hoursString: PropTypes.string.isRequired,
};

export default WeekTotal;

const Container = styled.div`
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    margin-top: 24px;
    padding: 15px;
    border-top: 6px solid #7499e8;
    background: var(--white);
    display: flex;
    flex-direction: column;

    h2 {
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 18px;
        text-align: center;
        margin: 0;
    }
`;

const AllHours = styled.div`
    display: flex;
    align-items: center;
    margin: 18px auto 0;
`;

const Hours = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 48px;

    span {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
    }

    div {
        color: var(--blue);
        font-size: 21px;
        font-weight: 500;
    }
`;
