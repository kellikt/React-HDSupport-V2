import { useState } from 'react';
import styled from '@emotion/styled';

import TextInput from '../../../TextInput';
import Button from '../../../Button';
import { TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';

function ExpandedRow(props) {
    const [state, setState] = useState({
        comment: props.comment,
        beginDate: props.beginDate,
        endDate: props.endDate,
    });

    const handleInput = event => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Row {...props}>
            <TextInput
                id="beginDate"
                label="Begin Date"
                name="beginDate"
                value={state.beginDate}
                onChange={handleInput}
                disabled={props.status === 0 ? false : true}
            />
            <TextInput
                id="endDate"
                label="End Date"
                name="endDate"
                value={state.endDate}
                onChange={handleInput}
                disabled={props.status === 0 ? false : true}
            />
            <TextInput
                id="comment"
                label="Comment"
                name="comment"
                value={state.comment}
                onChange={handleInput}
                disabled={props.status === 0 ? false : true}
            />
            <ButtonContainer>
                {props.status == 0 ?
                    <div>
                        <Button color="blue" onClick={() => (props.handleEdit(props.lid, state.beginDate, state.endDate, state.comment, props.status, props.staffComment))}>
                            Edit
                        </Button>
                        <Button color="red" onClick={() => (props.handleDelete(props.lid))}>
                            Delete
                        </Button>
                    </div>
                : <p>Request already processed. <br/>
                {props.staffComment.length > 0 ? `Manager Comments: ${props.staffComment}`: ''}
                <br/>Please contact your manager to make changes.</p>}
            </ButtonContainer>
        </Row>
    );
}

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: repeat(4, 1fr);
    padding: 0 18px;
    height: 120px;
`;

const ButtonContainer = styled.div`
    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        button {
            width: 100%;
            max-width: 250px;
            &:first-of-type {
                margin-bottom: 12px;
            }
        }
    }
    >p {
        margin-top: 30px;
    }
`;
