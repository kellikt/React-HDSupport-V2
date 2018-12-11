import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Heading from './Heading';
import { LayoutContext } from '../../../../LayoutContext';

class Index extends Component {
    state = {
        user: {},
    };

    getUserInfo = async () => {
        const { username } = this.props;

        try {
            const request = await axios.post('/search-user.php', {
                username: username,
                uuid: '',
                firstName: '',
                lastName: '',
            });
            const data = request.data;
            this.setState({
                user: data[0],
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
        const { user } = this.state;

        return (
            <Container>
                <Heading
                    name={`${user.first_name} ${user.last_name}`}
                    year={year}
                    payPeriod={payPeriod}
                    username={username}
                />
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
