import { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import TextInput from '../../../TextInput';
import Button from '../../../Button';
import { TableRow } from '../ClockMetrics/MetricsTableComponents';

class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        const { notes, beginDate, endDate } = this.props;
        this.state = {
            notes: notes,
            beginDate: beginDate,
            endDate: endDate,
        };
    }

    handleInput = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEdit = () => {
        const { sid, handleEdit } = this.props;
        const { notes, beginDate, endDate } = this.state;
        handleEdit(sid, notes, beginDate, endDate);
    };

    handleDelete = () => {
        const { sid, handleDelete } = this.props;
        handleDelete(sid);
    };

    render() {
        const { notes, beginDate, endDate } = this.state;
        const { username } = this.props;

        return (
            <Row {...this.props}>
                <Username>{username}</Username>
                <TextInput id="notes" label="Notes" name="notes" value={notes} onChange={this.handleInput} />
                <TextInput
                    id="beginDate"
                    label="Begin Date"
                    name="beginDate"
                    value={beginDate}
                    placeholder="12-1-2018"
                    onChange={this.handleInput}
                />
                <TextInput
                    id="endDate"
                    label="End Date"
                    name="endDate"
                    value={endDate}
                    placeholder="12-1-2018"
                    onChange={this.handleInput}
                />
                <ButtonContainer>
                    <Button color="gold" onClick={this.handleEdit}>
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
    notes: PropTypes.string,
    beginDate: PropTypes.string,
    endDate: PropTypes.string,
    sid: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: 0.7fr 1fr 0.7fr 0.7fr 0.3fr;
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

const Username = styled.span`
    font-weight: 700;
`;
