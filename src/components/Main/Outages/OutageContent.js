import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { OutageContext } from './OutageContext';

class OutageContent extends Component {
    state = {
        staff: [
            {
                uid: 1,
                first_name: 'placeholder',
                last_name: 'placeholder',
                notes: 'Vacation',
            },
        ],
        students: [
            {
                uid: 2,
                first_name: 'placeholder',
                last_name: 'placeholder',
                notes: 'Vacation',
            },
        ],
    };

    doArraysEqual = (a, b) => {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i].uid !== b[i].uid) return false;
        }
        return true;
    };

    getOutageData = async () => {
        let value = this.context;
        const { focused } = value;
        const currDate = new Date();
        const dateString = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate() + focused}`;

        try {
            const staffRequest = axios.get(`/get-outages.php?role=staff&date=${dateString}`);
            const studentRequest = axios.get(`/get-outages.php?role=student&date=${dateString}`);

            const results = await Promise.all([staffRequest, studentRequest]);
            const data = [results[0].data, results[1].data];

            if (!this.doArraysEqual(data[0], this.state.staff) || !this.doArraysEqual(data[1], this.state.students)) {
                this.setState({
                    staff: data[0],
                    students: data[1],
                });
            }
        } catch (error) {
            console.log(`Error fetching outages: ${error}`);
        }
    };

    componentDidMount() {
        this.getOutageData();
    }

    componentDidUpdate() {
        this.getOutageData();
    }

    render() {
        const { staff, students } = this.state;

        return (
            <Container>
                <Heading>
                    <h2>Staff</h2>
                    <h2>Students</h2>
                </Heading>

                <Content>
                    <div>
                        {staff.map(entry => {
                            return (
                                <Entry key={entry.uid}>
                                    <h4>{`${entry.first_name} ${entry.last_name}`}</h4>
                                    <span>{entry.notes}</span>
                                </Entry>
                            );
                        })}
                    </div>
                    <div>
                        {students.map(entry => {
                            return (
                                <Entry key={entry.uid}>
                                    <h4>{`${entry.first_name} ${entry.last_name}`}</h4>
                                    <span>{entry.notes}</span>
                                </Entry>
                            );
                        })}
                    </div>
                </Content>
            </Container>
        );
    }
}

OutageContent.contextType = OutageContext;

export default OutageContent;

const Container = styled.div`
    padding: 12px 15px;
`;

const Heading = styled.div`
    display: flex;
    justify-content: space-around;

    h2 {
        font-size: 21px;
        margin: 0;
        text-transform: uppercase;
        color: var(--white);
        letter-spacing: 0.035em;
        margin-bottom: 12px;

        @media (max-width: 500px) {
            font-size: 18px;
        }
    }
`;

const Entry = styled.div`
    margin-bottom: 12px;
`;

const Content = styled.div`
    display: flex;
    background: var(--white);
    border-radius: 6px;
    padding: 8px;
    justify-content: space-between;

    h4 {
        font-size: 20px;
        font-weight: 500;
        margin: 0;

        @media (max-width: 500px) {
            font-size: 16px;
        }
    }

    span {
        color: var(--black);
        font-weight: 500;
    }

    > div {
        &:nth-of-type(2) {
            text-align: right;
        }
    }
`;
