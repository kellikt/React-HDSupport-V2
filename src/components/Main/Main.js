import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Roles from './Roles';
import ClockInButton from './ClockInButton';
import LinksContainer from './LinksContainer';
import Outages from './Outages/Outages';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
        };
    }

    async componentDidMount() {
        const request = await axios.get('/get-name.php?uuid=22051104');
        const data = await request.data;

        this.setState({
            firstName: data.first_name,
        });
    }

    render() {
        const { firstName } = this.state;

        return (
            <Container>
                <div>
                    <Name>Welcome {firstName}!</Name>
                    <Roles />
                    <ClockInButton />
                    <LinksContainer />
                </div>
                <div>
                    <Outages />
                </div>
            </Container>
        );
    }
}

export default Main;

const Container = styled.main`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Name = styled.h1`
    font-weight: 500;
    font-size: 34px;
    margin-bottom: 0.5em;
`;
