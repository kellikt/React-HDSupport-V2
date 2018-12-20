import React, { Component } from 'react';
import axios from 'axios';

import { LayoutContext } from '../../LayoutContext';

export const ClockContext = React.createContext();

export class ClockProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            lastClock: {},
            clockedIn: null,
            loading: true,
            timedOut: false,
        };
    }

    async componentDidMount() {
        try {
            let value = this.context;
            const { username } = value;

            const lastClockRequest = await axios.get(
                `${process.env.REACT_APP_DB_SERVER}/get-last-clock.php?username=${username}`
            );
            const clockData = lastClockRequest.data;

            const time = `${clockData.hour}:${clockData.min} ${clockData.ampm}`;
            const date = `${clockData.month}-${clockData.day}-${clockData.year}`;

            this.setState({
                username: username,
                clockedIn: clockData.action === 'out' ? false : true,
                lastClock: {
                    action: clockData.action,
                    dayOfWeek: clockData.dow,
                    time: time,
                    date: date,
                    comments: clockData.comments,
                },
                loading: false,
            });
        } catch (error) {
            let value = this.context;
            const { username } = value;
            this.setState({
                username: username,
                clockedIn: false,
                lastClock: {
                    action: 'out',
                },
                loading: false,
            });
        }
    }

    handleSubmit = async commentString => {
        const { username, clockedIn } = this.state;
        let action;
        if (clockedIn) action = 'out';
        else action = 'in';

        try {
            await axios.post(`${process.env.REACT_APP_DB_SERVER}/clock-in.php`, {
                username: username,
                comments: commentString,
                action: action,
            });
            this.refreshForm();
        } catch (error) {
            this.setState({
                timedOut: true,
            });
        }
    };

    refreshForm = async () => {
        try {
            const lastClockRequest = await axios.get(
                `${process.env.REACT_APP_DB_SERVER}/get-last-clock.php?username=${this.state.username}`
            );
            const clockData = await lastClockRequest.data;

            const time = `${clockData.hour}:${clockData.min} ${clockData.ampm}`;
            const date = `${clockData.month}-${clockData.day}-${clockData.year}`;

            this.setState({
                clockedIn: clockData.action === 'out' ? false : true,
                lastClock: {
                    action: clockData.action,
                    dayOfWeek: clockData.dow,
                    time: time,
                    date: date,
                    comments: clockData.comments,
                },
            });
        } catch (error) {
            this.setState({
                timedOut: true,
            });
        }
    };

    render() {
        const { children } = this.props;

        return (
            <ClockContext.Provider
                value={{
                    username: this.state.username,
                    lastClock: this.state.lastClock,
                    clockedIn: this.state.clockedIn,
                    handleSubmit: this.handleSubmit,
                    loading: this.state.loading,
                    timedOut: this.state.timedOut,
                }}
            >
                {children}
            </ClockContext.Provider>
        );
    }
}

ClockProvider.contextType = LayoutContext;

export const ClockConsumer = ClockContext.Consumer;
