import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class DisplayChangesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    async componentDidMount() {
        const { username, date, option } = this.props;
        const startDateString = `${date[0].getFullYear()}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
        const endDateString = `${date[1].getFullYear()}-${date[1].getMonth() + 1}-${date[1].getDate()}`;

        try {
            const request = await axios.post('/get-schedule-changes.php', {
                username: username,
                beginDate: startDateString,
                endDate: endDateString,
            });
            const data = await request.data;

            this.setState({
                results: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return <div {...this.props}>yo lol</div>;
    }
}

DisplayChangesTable.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
    option: PropTypes.string,
};

export default DisplayChangesTable;
