import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import posed from 'react-pose';

import { ReactComponent as Warning } from '../../../../images/icons/RedExclamation.svg';
import { ReactComponent as GreenCheck } from '../../../../images/icons/GreenCheck.svg';
import { ReactComponent as WarningExclamation } from '../../../../images/icons/WarningExclamation.svg';
import TextInput from '../../../TextInput';
import Button from '../../../Button';
import CloseButton from '../../../CloseButton';
import SnackbarPortal from '../../../SnackbarPortal';

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
        message: '',
        error: false,
        edited: false,
        heading: '',
    };

    handleSnack = () => {
        this.setState({
            error: false,
            edited: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {
            dayObj: { date },
            username,
            close,
            refreshData,
        } = this.props;
        const { eid, t0, t1, t2, t3, t4, t5 } = this.state.exception;

        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-single-exception.php`, {
                username: username,
                date: date,
                eid: eid,
                t0: t0,
                t1: t1,
                t2: t2,
                t3: t3,
                t4: t4,
                t5: t5,
            });
            this.setState({
                message: `Added exception for ${username} on ${date}`,
                heading: 'Success!',
                edited: true,
            });
            refreshData();
            this.timeoutId = setTimeout(() => {
                this.handleSnack();
                close();
            }, 1500);
        } catch (error) {
            console.log(error);
        }
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
            const request = await axios.get(
                `${process.env.REACT_APP_DB_SERVER}/get-single-exception.php?date=${dayObj.date}&username=${username}`
            );
            const data = request.data;
            this.setState({
                exception: data[0],
                logs: data[1],
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {
        const { dayObj, day, close } = this.props;
        const { exception, logs, message, heading, edited, error } = this.state;

        return (
            <Container onSubmit={this.handleSubmit} {...this.props}>
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
                    {logs.sort(({ logid: previousID }, { logid: currentID}) => previousID - currentID).map(log => {
                        return <span key={log.logid}>{`${log.hour}:${log.min} ${log.ampm}`}</span>;
                    })}
                </Times>
                <Comments>
                    <Label>Comments:</Label>
                    {logs.sort(({ logid: previousID }, { logid: currentID}) => previousID - currentID).map(log => {
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
                    <Button color="light-blue">Submit Exception</Button>
                </Exceptions>
                <CloseButton onClick={close} />
                <SnackbarPortal
                    handler={edited}
                    message={message}
                    heading={heading}
                    onClick={this.handleSnack}
                    isError={error}
                />
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
    close: PropTypes.func,
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
    position: relative;

    > span {
        top: 15px;
        right: 15px;
        width: 36px;
        height: 36px;
        padding: 10px;
    }
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

    > button {
        grid-column: 9 / span 2;
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
