import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import posed from 'react-pose';

import { ReactComponent as Warning } from '../../../../images/icons/RedExclamation.svg';
import { ReactComponent as GreenCheck } from '../../../../images/icons/GreenCheck.svg';
import { ReactComponent as WarningExclamation } from '../../../../images/icons/WarningExclamation.svg';
import TextInput from '../../../TextInput';

class DayException extends Component {
    state = {
        exception: {
            t0: '',
            t1: '',
            t2: '',
            t3: '',
            t4: '',
            t5: '',
        },
        logs: [],
    };

    handleSubmit = event => {
        event.preventDefault();
        alert('hey');
    };

    handleChange = event => {
        const { exception } = this.state;
        const name = event.target.name;

        this.setState({
            exception: {
                ...exception,
                [name]: event.target.value,
            },
        });
    };

    async componentDidMount() {
        const { username, dayObj } = this.props;

        try {
            const request = await axios.get(`/get-single-exception.php?date=${dayObj.date}&username=${username}`);
            const data = request.data;
            this.setState({
                exception: data[0],
                logs: data[1],
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { dayObj, day } = this.props;
        const { exception, logs } = this.state;

        return (
            <Container {...this.props}>
                <Heading>
                    <Reminder>
                        <WarningExclamation />
                        <div>Remember to enter exceptions for all displayed times.</div>
                    </Reminder>
                    <DateTitle>
                        <div>{dayObj.date}</div>
                        <div>{day}</div>
                    </DateTitle>
                    {exception.eid === '' ? (
                        <ExceptionCheck green>
                            <GreenCheck />
                            No exceptions exist.
                        </ExceptionCheck>
                    ) : (
                        <ExceptionCheck>
                            <Warning />
                            Exceptions exist!
                        </ExceptionCheck>
                    )}
                </Heading>
                <Times>
                    <Label>Times:</Label>
                    {logs.map(log => {
                        return <span key={log.logid}>{`${log.hour}:${log.min} ${log.ampm}`}</span>;
                    })}
                </Times>
                <Comments>
                    <Label>Comments:</Label>
                    {logs.map(log => {
                        return <span key={log.logid}>{log.comments}</span>;
                    })}
                </Comments>
                <Exceptions>
                    <Label>Exceptions:</Label>
                    <TextInput value={exception.t0} name="t0" onChange={this.handleChange} placeholder="00:00 AM" />
                    <TextInput value={exception.t1} name="t1" onChange={this.handleChange} placeholder="00:00 AM" />
                    <TextInput value={exception.t2} name="t2" onChange={this.handleChange} placeholder="00:00 AM" />
                    <TextInput value={exception.t3} name="t3" onChange={this.handleChange} placeholder="00:00 AM" />
                    <TextInput value={exception.t4} name="t4" onChange={this.handleChange} placeholder="00:00 AM" />
                    <TextInput value={exception.t5} name="t5" onChange={this.handleChange} placeholder="00:00 AM" />
                </Exceptions>
            </Container>
        );
    }
}

DayException.defaultProps = {
    username: '',
};

DayException.propTypes = {
    dayObj: PropTypes.object.isRequired,
    username: PropTypes.string,
};

export default DayException;

const AnimatedDay = posed.form({
    enter: { opacity: 1, delay: 300 },
    exit: { opacity: 0 },
});

const Container = styled(AnimatedDay)`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 500;
    border-top: 3px solid #e4ebf4;
    border-bottom: 3px solid #e4ebf4;
    min-height: 100px;
`;

const Label = styled.div`
    color: var(--light-blue);
    text-align: left;
    padding: 15px;
`;

const Times = styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    text-align: center;
    align-items: center;

    > span {
        padding: 15px;

        &:nth-of-type(even) {
            color: var(--red);
        }
        &:nth-of-type(odd) {
            color: var(--green);
        }
    }
`;

const Comments = styled(Times)`
    > span {
        color: var(--dark-grey) !important;
        font-weight: 400;
        text-align: left;
    }
`;

const Exceptions = styled(Times)`
    label {
        margin: 0;
    }

    .styled-input {
        padding: 15px 2px;
        margin: 0;
    }
`;

const DateTitle = styled.div`
    text-align: center;

    > div {
        &:first-of-type {
            color: var(--blue);
            font-size: 20px;
            font-weight: 600;
        }
        &:last-of-type {
            color: var(--dark-grey);
            font-weight: 400;
            font-size: 16px;
        }
    }
`;

const Heading = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ExceptionCheck = styled.div`
    display: flex;
    align-items: center;
    color: ${props => (props.green ? 'var(--green)' : 'var(--red)')};

    svg {
        width: 21px;
        height: 21px;
        margin-right: 12px;
    }
`;

const Reminder = styled(ExceptionCheck)`
    display: flex;
    align-items: center;

    > div {
        font-style: italic;
        font-size: 15px;
        color: var(--gold);
        font-weight: 400;
        line-height: 1.6;
        max-width: 25ch;
    }
`;
