import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                first_name: '',
            },
        };
    }

    async componentDidMount() {
        const request = await axios.get('/get-user-info.php?uuid=22051104');
        const data = await request.data;

        this.setState({
            userData: data,
        });
    }

    render() {
        const { userData } = this.state;
        console.log(userData);

        return (
            <Container>
                <Name>Welcome {userData.first_name}!</Name>
                <Roles>
                    You are Staff and you are an Administrator and a Lab/Help
                    Desk Manager.
                </Roles>
            </Container>
        );
    }
}

export default Main;

const Container = styled.main`
    margin-top: 60px;
`;

const Name = styled.h1`
    font-weight: 500;
    font-size: 34px;
    margin-bottom: 0.5em;
`;

const Roles = styled.h2`
    font-weight: 300;
    color: #3e87cf;
    max-width: 30ch;
    font-size: 34px;
    margin: 0;
`;
