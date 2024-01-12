import { useState } from 'react';
import styled from '@emotion/styled';

import TextInput from '../../../TextInput';
import Button from '../../../Button';
import { TableRow } from '../../SchedMgmt/ClockMetrics/MetricsTableComponents';
import Checkbox from '../../../Checkbox';

function ExpandedRow(props) {
    const [state, setState] = useState({
        title: props.title,
        description: props.description,
        helpDesk: props.helpDesk,
        lab: props.lab,
        openDate: props.openDate,
        closeDate: props.closeDate,
    });

    const handleInput = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleCheck = (type) => {
        switch (type) {
            case 'helpDesk':
                if (state.helpDesk == 'yes') {
                    setState({
                        ...state,
                        helpDesk: 'no',
                    });
                } else {
                    setState({
                        ...state,
                        helpDesk: 'yes',
                    });
                }
                break;
            case 'lab':
                if (state.lab == 'yes') {
                    setState({
                        ...state,
                        lab: 'no',
                    });
                } else {
                    setState({
                        ...state,
                        lab: 'yes',
                    });
                }
                break;
            default:
                break;
        }
    };

    return (
        <Row {...props}>
            <TextInput id="title" label="Title" name="title" value={state.title} onChange={handleInput} />
            <TextInput id="openDate" label="Open Date" name="openDate" value={state.openDate} onChange={handleInput} />
            <TextInput
                id="closeDate"
                label="Close Date"
                name="closeDate"
                value={state.closeDate}
                onChange={handleInput}
            />
            <Description>
                <label>Description</label>
                <textarea name="description" value={state.description} onChange={handleInput} />
            </Description>
            <RoleGroups>
                <label>Show to groups:</label>
                <Checkbox
                    id="helpDesk"
                    label="Help Desk/Leap Start"
                    onChange={() => handleCheck('helpDesk')}
                    checked={state.helpDesk === 'yes' ? true : false}
                />
                <Checkbox
                    id="lab"
                    label="Lab Monitors"
                    onChange={() => handleCheck('lab')}
                    checked={state.lab === 'yes' ? true : false}
                />
            </RoleGroups>
            <ButtonContainer>
                <Button
                    color="cyan"
                    onClick={() =>
                        props.handleEdit(props.anid, state.title, state.description, state.helpDesk, state.lab, state.openDate, state.closeDate)
                    }
                >
                    Edit
                </Button>
                <Button color="red" onClick={() => props.handleDelete(props.anid)}>
                    Delete
                </Button>
            </ButtonContainer>
        </Row>
    );
}

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 0 18px;
    height: 500px;

    > div {
        &:nth-of-type(4) {
            grid-column: 1/4;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 20px;

    > button {
        &:nth-of-type(2) {
            margin-top: 20px;
        }
    }
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    label {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
        color: var(--dark-grey);
        margin-bottom: 8px;
        padding-left: 12px;
    }

    textarea {
        border-radius: 15px;
        padding: 15px;
        height: 222px;
    }
`;

const RoleGroups = styled.div`
    grid-column: 1/4;
    margin-top: 20px;

    > label {
        margin: 20px;
        font-weight: 400;
        color: var(--dark-grey);
    }
`;
