import { useState } from 'react';
import axios from 'axios';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';

import { ReactComponent as Graphic } from '../../../../images/Admin/Announce/Add.svg';
import { FormEl, Title, AnnouncementInputs, Description, ButtonGroup, RoleGroups } from './AnnouncementsComponents.js';
import TextInput from '../../../TextInput';
import Button from '../../../Button';
import SnackbarPortal from '../../../SnackbarPortal';
import Checkbox from '../../../Checkbox';

function Announcements() {
    const [state, setState] = useState({
        date: [new Date(), new Date()],
        title: '',
        description: '',
        submitted: false,
        message: '',
        messageHeading: '',
        helpDesk: 'yes',
        lab: 'yes',
        error: false,
    });

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setState({
            ...state,
            [name]: value,
        });
    };

    const handleCheck = type => {

        switch(type) {
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
    }

    const handleDate = (date) => {
        setState({
            ...state,
            date: date,
        });
    };

    const handleSnack = () => {
        setState({
            ...state,
            submitted: false,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const openDateString = `${state.date[0].getFullYear()}-${
            state.date[0].getMonth() + 1
        }-${state.date[0].getDate()}`;
        const closeDateString = `${state.date[1].getFullYear()}-${
            state.date[1].getMonth() + 1
        }-${state.date[1].getDate()}`;

        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-announcement.php`, {
                title: state.title,
                description: state.description,
                openDate: openDateString,
                closeDate: closeDateString,
                helpDesk: state.helpDesk,
                lab: state.lab,
            });
            const data = request.data;

            if (data) {
                setState({
                    ...state,
                    submitted: true,
                    message: 'Successfully submitted announcement.',
                    messageHeading: 'Success!',
                    error: false,
                });
            } else {
                setState({
                    ...state,
                    submitted: true,
                    message: 'Failed to submit announcement.',
                    messageHeading: 'Error!',
                    error: true,
                });
            }
            const timeoutId = setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormEl onSubmit={handleSubmit}>
            <Title>
                <h2>Add Announcement</h2>
                <p>Add a manual announcement with an open/close date to appear based on student-clock-ins.</p>
            </Title>
            <AnnouncementInputs color="pink">
                <h3>Date Range:</h3>
                <DateRangerPicker onChange={handleDate} value={state.date} calendarType="US" />
            </AnnouncementInputs>
            <Graphic />
            <div>
                <TextInput 
                    id="title"
                    label="Title"
                    value={state.title}
                    onChange={handleChange}
                    name="title"
                />
                <Description>
                    <label>Description</label>
                    <textarea name="description" value={state.description} onChange={handleChange} />
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
                <ButtonGroup>
                    <Button color="pink">Submit Announcement</Button>
                </ButtonGroup>
                <SnackbarPortal
                    handler={state.submitted}
                    message={state.message}
                    heading={state.messageHeading}
                    isError={state.error}
                    onClick={handleSnack}
                />
            </div>
        </FormEl>
    );
}

export default Announcements;
