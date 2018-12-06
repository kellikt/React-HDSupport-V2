import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Table, TableLabel, TableHeading, TableRow } from '../ClockMetrics/MetricsTableComponents';
import { ReactComponent as TableLogo } from '../../../../images/Admin/Sched/Table.svg';
import TextInput from '../../../TextInput';
import CloseButton from '../../../CloseButton';
import Button from '../../../Button';
import SnackbarPortal from '../../../SnackbarPortal';

class AddException extends Component {
    constructor(props) {
        super(props);
        this.state = {
            t0: '',
            t1: '',
            t2: '',
            t3: '',
            t4: '',
            t5: '',
            eid: '',
            loggedTimes: [],
            searched: false,
            message: 'No exception currently exists for this user.',
            heading: 'Hey!',
            error: false,
        };
        this.ref = React.createRef();
    }

    handleError = () => {
        this.setState({
            message: `Something went wrong with the database.`,
            heading: 'Error!',
            searched: true,
            error: true,
        });
        this.handleClose(2000);
    };

    handleClose = async num => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        this.timeoutId = setTimeout(() => {
            this.props.handleClose();
        }, num);
    };

    handleInput = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { username, date } = this.props;
        const { t0, t1, t2, t3, t4, t5, eid } = this.state;

        if (t0 === '' || t0 === undefined) {
            this.setState({
                message: `Missing input fields! Check time inputs.`,
                heading: 'Error!',
                searched: true,
                error: true,
            });
            this.snackTimer = setTimeout(() => {
                this.handleSnack();
            }, 3000);
        } else {
            try {
                await axios.post('/add-single-exception.php', {
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
                    searched: true,
                });

                this.handleClose(1200);
            } catch (error) {
                this.handleError();
            }
        }
    };

    handleSnack = () => {
        this.setState({
            searched: false,
            error: false,
        });
    };

    async componentDidMount() {
        const { username, date } = this.props;

        try {
            const request = await axios.get(`/get-single-exception.php?date=${date}&username=${username}`);
            const data = request.data;

            const { t0, t1, t2, t3, t4, t5, eid } = data[0];
            const times = data[1];
            this.setState({ t0: t0, t1: t1, t2: t2, t3: t3, t4: t4, t5: t5, eid: eid, loggedTimes: times });

            if (username === '') {
                this.setState({
                    message: 'No username selected!',
                    heading: 'Error!',
                    error: true,
                    searched: true,
                });
                this.handleClose(2000);
            } else if (times.length === 0) {
                this.setState({
                    message: 'No clock-in exists for this day!',
                    heading: 'Error!',
                    error: true,
                    searched: true,
                });
                this.handleClose(2000);
            }
        } catch (error) {
            this.handleError();
        }

        this.ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        clearTimeout(this.snackTimer);
    }

    render() {
        const { t0, t1, t2, t3, t4, t5, loggedTimes, searched, message, heading, error } = this.state;
        const { username, date } = this.props;

        return (
            <Form ref={this.ref} onSubmit={this.handleSubmit}>
                <CustomTable {...this.props}>
                    <Label>
                        <TableLogo />
                        <div>
                            <h2>Exceptions for: {username}</h2>
                            <span>{date}</span>
                        </div>
                        <CloseButton onClick={() => this.handleClose(300)} />
                    </Label>
                    <Heading>
                        <span />
                        <span>Start</span>
                        <span>Stop</span>
                        <span>Start</span>
                        <span>Stop</span>
                        <span>Start</span>
                        <span>Stop</span>
                    </Heading>
                    <Row>
                        <span>Logged Times:</span>
                        {loggedTimes.map(time => {
                            return <span key={time.logid}>{`${time.hour}:${time.min} ${time.ampm}`}</span>;
                        })}
                    </Row>
                    <Row>
                        <span>Exceptions:</span>
                        <TextInput value={t0} placeholder="00:00 AM" name="t0" onChange={this.handleInput} />
                        <TextInput value={t1} placeholder="00:00 AM" name="t1" onChange={this.handleInput} />
                        <TextInput value={t2} placeholder="00:00 AM" name="t2" onChange={this.handleInput} />
                        <TextInput value={t3} placeholder="00:00 AM" name="t3" onChange={this.handleInput} />
                        <TextInput value={t4} placeholder="00:00 AM" name="t4" onChange={this.handleInput} />
                        <TextInput value={t5} placeholder="00:00 AM" name="t5" onChange={this.handleInput} />
                    </Row>
                    <Row>
                        <span>Comments:</span>
                        {loggedTimes.map(time => {
                            return <Comments key={time.logid}>{time.comments}</Comments>;
                        })}
                    </Row>
                </CustomTable>
                <Button color="green">Submit</Button>
                <SnackbarPortal
                    handler={searched}
                    message={message}
                    heading={heading}
                    onClick={this.handleSnack}
                    isError={error}
                />
            </Form>
        );
    }
}

AddException.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddException;

const Form = styled.form`
    padding-bottom: 30px;

    > button {
        display: block;
        margin-left: auto;
    }
`;

const CustomTable = styled(Table)`
    margin: 120px 0 30px;
`;

const Label = styled(TableLabel)`
    background: var(--green-button);
    position: relative;
`;

const Heading = styled(TableHeading)`
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
`;

const Row = styled(TableRow)`
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;

    span {
        font-weight: 500;

        &:first-of-type {
            color: var(--light-blue);
            justify-self: start;
        }

        &:nth-of-type(2),
        &:nth-of-type(4),
        &:nth-of-type(6) {
            color: var(--green);
        }
        &:nth-of-type(3),
        &:nth-of-type(5),
        &:nth-of-type(7) {
            color: var(--red);
        }
    }
`;

const Comments = styled.div`
    line-height: 1.6;
    color: var(--black);
`;
