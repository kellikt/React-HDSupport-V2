import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TextInput from '../../../TextInput';
import Button from '../../../Button';
import { TableRow } from '../ClockMetrics/MetricsTableComponents';

class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        const { beginDate, endDate, comment } = this.props;
        this.state = {
            comment: comment,
            beginDate: beginDate,
            endDate: endDate,
        }
    }

    handleInput = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEdit = () => {
        const { lid, status, handleEdit } = this.props;
        const { comment, beginDate, endDate } = this.state;
        handleEdit(lid, beginDate, endDate, comment, status);
    };

    handleDelete = () => {
        const { lid, handleDelete } = this.props;
        handleDelete(lid);
    }

    render() {
        const { comment, beginDate, endDate } = this.state;
        const { status } = this.props;
        
        return (
            <Row {...this.props}>
                <TextInput
                    id="beginDate"
                    label="Begin Date"
                    name="beginDate"
                    value={beginDate}
                    onChange={this.handleInput}
                />
                <TextInput
                    id="endDate"
                    label="End Date"
                    name="endDate"
                    value={endDate}
                    onChange={this.handleInput}
                />
                <TextInput
                    id="comment"
                    label="Comment"
                    name="comment"
                    value={comment}
                    onChange={this.handleInput}
                />
                <ButtonContainer>
                    {status !== 2 &&
                        <Button color="blue" onClick={this.handleEdit}>
                            Edit
                        </Button>
                    }
                    <Button color="blue" onClick={this.handleDelete}>
                        Delete
                    </Button>
                </ButtonContainer>
            </Row>
        )
    }
}

ExpandedRow.propTypes = {
    comment: PropTypes.string,
    beginDate: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string,
    lid: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: repeat(4, 1fr);
    padding: 0 18px;
    height: 120px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        &:first-of-type {
            margin-bottom: 12px;
        }
    }
`;
