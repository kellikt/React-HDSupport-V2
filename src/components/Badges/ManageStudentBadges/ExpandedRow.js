import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import TextInput from '../../TextInput';
import Button from '../../Button';
import { TableRow } from '../../Admin/SchedMgmt/ClockMetrics/MetricsTableComponents';

const dayjs = require('dayjs');

class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        const { username, title, timestamp, comments } = this.props;
        this.state = {
            username: username,
            title: title,
            timestamp: dayjs.unix(timestamp).format('MM-DD-YYYY'),
            comments: comments,
        };
    }

    handleInput = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEdit = () => {
        const { bid, fav, handleEdit } = this.props;
        const { username, timestamp, comments } = this.state;
        handleEdit( username, bid, timestamp, comments, fav );
    };

    handleDelete = () => {
        const { bid, uid, handleDelete } = this.props;
        handleDelete(bid, uid);
    };

    handleChangeComplete = (color) => {
        this.setState({ hex: color.hex });
    }

    render() {
        const { username, title, timestamp, comments } = this.state;


        return (
            <Row {...this.props}>
                <span>{username}</span>
                <span>{title}</span>
                <TextInput
                    id="timestamp"
                    label="Timestamp"
                    name="timestamp"
                    value={timestamp}
                    onChange={this.handleInput}
                />
                <TextInput
                    id="comments"
                    label="Comments"
                    name="comments"
                    value={comments}
                    onChange={this.handleInput}
                />
                <ButtonContainer>
                    <Button color="dark-blue" onClick={this.handleEdit}>
                        Edit
                    </Button>
                    <Button color="red" onClick={this.handleDelete}>
                        Delete
                    </Button>
                </ButtonContainer>
            </Row>
        );
    }
}

ExpandedRow.propTypes = {
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
    comments: PropTypes.string,
    fav: PropTypes.string,
    bid: PropTypes.number.isRequired,
    uid: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.8fr 0.3fr;
    padding: 0 18px;
    height: 120px;

    span {
        &:last-of-type {
            justify-self: start;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

    button {
        &:first-of-type {
            margin-bottom: 12px;
        }
    }
`;
