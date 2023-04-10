import { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import {
    useParams,
} from 'react-router-dom';

import { LayoutContext } from '../../../LayoutContext';
import Button from '../../Button';
import { FormEl, Title } from './FormComponents';
import Breadcrumb from '../Breadcrumb';
import TextInput from '../../TextInput';
import Checkbox from '../../Checkbox';
import SnackbarPortal from '../../SnackbarPortal';
import { ReactComponent as Personal } from '../../../images/Admin/Acct/EditPersonal.svg';
import { ReactComponent as Contact } from '../../../images/Admin/Acct/EditContact.svg';
import Background from '../../Background';

export default function Edit() {
    const { username } = useParams();
    const { roles: { admin, super_admin }} = useContext(LayoutContext);
    const [state, setState] = useState({
        roles: {
            super_admin: 'no',
            administrator: 'no',
            helpdesk: 'no',
            lab: 'no',
            manager: 'no',
            staff: 'no',
            tech: 'no',
            third_shift: 'no',
            leapstart: 'no',
            first_staff: 'no',
            second_staff: 'no',
            third_staff: 'no',
        },
        info: {
            first_name: '',
            last_name: '',
            username: '',
            alt_email: '',
            cell_phone: '',
            city: '',
            date_of_employ: '',
            expired: 0,
            home_phone: '',
            other_phone: '',
            street_address: '',
            uuid: 0,
            zipcode: '',
            uid: 0,
            priority: 0,
        }
    });

    const [snack, setSnack] = useState(false);

    useEffect(() => {
        console.log(super_admin);
        const fetchData = async() => {
            const rolesRequest = axios.get(`${process.env.REACT_APP_DB_SERVER}/get-roles.php?username=${username}`);
            const infoRequest = axios.post(`${process.env.REACT_APP_DB_SERVER}/search-user.php`, {
                username: username,
                uuid: '',
                firstName: '',
                lastName: '',
            });

            const response = await Promise.all([rolesRequest, infoRequest]);
            const data = [response[0].data, response[1].data];

            setState({
                ...state,
                roles: data[0],
                info: data[1][0],
            });
        }
        try {
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, []);

    const handleChange = (event, type) => {
        switch (type) {
            case 'firstName':
                setState({
                    ...state,
                    info: { ...state.info, first_name: event.target.value },
                });
                break;
            case 'lastName':
                setState({
                    ...state,
                    info: { ...state.info, last_name: event.target.value },
                });
                break;
            case 'address':
                setState({
                    ...state,
                    info: { ...state.info, street_address: event.target.value },
                });
                break;
            case 'city':
                setState({
                    ...state,
                    info: { ...state.info, city: event.target.value },
                });
                break;
            case 'zip':
                setState({
                    ...state,
                    info: { ...state.info, zipcode: event.target.value },
                });
                break;
            case 'username':
                setState({
                    ...state,
                    info: { ...state.info, username: event.target.value.trim() },
                });
                break;
            case 'uuid':
                setState({
                    ...state,
                    info: { ...state.info, uuid: event.target.value },
                });
                break;
            case 'nonuh':
                setState({
                    ...state,
                    info: { ...state.info, alt_email: event.target.value },
                });
                break;
            case 'homephone':
                setState({
                    ...state,
                    info: { ...state.info, home_phone: event.target.value },
                });
                break;
            case 'cellphone':
                setState({
                    ...state,
                    info: { ...state.info, cell_phone: event.target.value },
                });
                break;
            case 'priority':
                this.setState({
                    info: { ...info, priority: event.target.value },
                });
                break;
            default:
                break;
        }
    };

    const handleCheck = type => {

        switch (type) {
            case 'lab':
                if (state.roles.lab === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            lab: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            lab: 'yes',
                        },
                    });
                }
                break;
            case 'helpdesk':
                if (state.roles.helpdesk === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            helpdesk: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            helpdesk: 'yes',
                        },
                    });
                }
                break;
            case 'tech':
                if (state.roles.tech === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            tech: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            tech: 'yes',
                        },
                    });
                }
                break;
            case 'staff':
                if (state.roles.staff === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            staff: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            staff: 'yes',
                        },
                    });
                }
                break;
            case 'third':
                if (state.roles.third_shift === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            third_shift: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            third_shift: 'yes',
                        },
                    });
                }
                break;
            case 'leapstart':
                if (state.roles.leapstart === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            leapstart: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            leapstart: 'yes',
                        },
                    });
                }
                break;
            case 'manager':
                if (state.roles.manager === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            manager: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            manager: 'yes',
                        },
                    });
                }
                break;
            case 'admin':
                if (state.roles.administrator === 'yes') {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            administrator: 'no',
                        },
                    });
                } else {
                    setState({
                        ...state,
                        roles: {
                            ...state.roles,
                            administrator: 'yes',
                        },
                    });
                }
                break;
            case 'super_admin':
                if (roles.super_admin === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            super_admin: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            super_admin: 'yes',
                        },
                    });
                }
                break;
            case 'enabled':
                if (state.info.expired === 1) {
                    setState({
                        ...state,
                        info: {
                            ...state.info,
                            expired: 0,
                        },
                    });
                } else {
                    setState({
                        ...state,
                        info: {
                            ...state.info,
                            expired: 1,
                        },
                    });
                }
                break;
            case 'first_staff':
                if (roles.first_staff === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            first_staff: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            first_staff: 'yes',
                        },
                    });
                }
                break;
            case 'second_staff':
                if (roles.second_staff === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            second_staff: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            second_staff: 'yes',
                        },
                    });
                }
                break;
            case 'third_staff':
                if (roles.third_staff === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            third_staff: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            third_staff: 'yes',
                        },
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const groups = axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-user-groups.php`, {
                super_admin: state.roles.super_admin,
                administrator: state.roles.administrator,
                helpdesk: state.roles.helpdesk,
                lab: state.roles.lab,
                manager: state.roles.manager,
                staff: state.roles.staff,
                tech: state.roles.tech,
                third_shift: state.roles.third_shift,
                leapstart: state.roles.leapstart,
                first_staff: state.roles.first_staff,
                second_staff: state.roles.second_staff,
                third_staff: state.roles.third_staff,
                username: state.info.username,
                uid: state.info.uid,
            });

            const userInfo = axios.post(`${process.env.REACT_APP_DB_SERVER}/edit-user.php`, {
                uuid: state.info.uuid,
                firstName: state.info.first_name,
                lastName: state.info.last_name,
                username: state.info.username,
                altEmail: state.info.alt_email,
                homePhone: state.info.home_phone,
                cellPhone: state.info.cell_phone,
                otherPhone: state.info.other_phone,
                address: state.info.street_address,
                zip: state.info.zipcode,
                city: state.info.city,
                expired: state.info.expired,
                uid: state.info.uid,
                priority: state.info.priority,
            });

            await Promise.all([groups, userInfo]);

            setSnack(true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            const timeoutId = setTimeout(() => {
                handleSnack();
            }, 3000);
        } catch (error) {
            console.log(`Error editing user: ${error}`);
        }
    }

    const handleSnack = () => {
        setSnack(false);
    }

    const links = [
        { title: 'Account Management', to: '/acctmgmt' },
        { title: 'Edit User', to: '/acctmgmt/edituser' },
    ];

    return (
        <Container>
            <h1>Edit User</h1>
            <Breadcrumb links={links} color="purple" />
            <EditForm onSubmit={handleSubmit}>
                <Title className="title">
                    <h1>Edit Details</h1>
                    <p>Make any desired changes in the forms below, then hit save at the bottom.</p>
                </Title>
                <FormSection id="personal">Personal Info</FormSection>
                <TextInput
                    label="First Name"
                    id="firstname"
                    placeholder="Jane"
                    value={state.info.first_name}
                    onChange={event => handleChange(event, 'firstName')}
                />
                <TextInput
                    label="Last Name"
                    id="lastname"
                    placeholder="Doe"
                    value={state.info.last_name}
                    onChange={event => handleChange(event, 'lastName')}
                />
                <TextInput
                    label="Street Address"
                    id="address"
                    placeholder="1234 Placeholder Street"
                    value={state.info.street_address}
                    onChange={event => handleChange(event, 'address')}
                />
                <TextInput
                    label="City"
                    id="city"
                    placeholder="Honolulu"
                    value={state.info.city}
                    onChange={event => handleChange(event, 'city')}
                />
                <TextInput
                    label="Zipcode"
                    id="zip"
                    placeholder="96822"
                    value={state.info.zipcode}
                    onChange={event => handleChange(event, 'zip')}
                />
                <FormSection id="contact">Contact Info</FormSection>
                <TextInput
                    label="UH Username"
                    id="username"
                    placeholder="janed"
                    value={state.info.username}
                    onChange={event => handleChange(event, 'username')}
                />
                <TextInput
                    label="UH Number"
                    id="uuid"
                    placeholder="12345678"
                    value={`${state.info.uuid}`}
                    onChange={event => handleChange(event, 'uuid')}
                />
                <TextInput
                    label="Non-UH Email"
                    id="altemail"
                    placeholder="janed@gmail.com"
                    value={state.info.alt_email}
                    onChange={event => handleChange(event, 'nonuh')}
                />
                <TextInput
                    label="Home Phone"
                    id="homephone"
                    placeholder="808-956-8883"
                    value={state.info.home_phone}
                    onChange={event => handleChange(event, 'homephone')}
                />
                <TextInput
                    label="Cell Phone"
                    id="cellphone"
                    placeholder="808-956-8883"
                    value={state.info.cell_phone}
                    onChange={event => handleChange(event, 'cellphone')}
                />
                <FormSection id="roles">Roles</FormSection>
                <FunctionalRoles>
                    <h2>Functional Roles: </h2>
                    <Checkbox
                        id="lab"
                        label="Lab Monitor"
                        onChange={() => handleCheck('lab')}
                        checked={state.roles.lab === 'yes' ? true : false}
                        color="purple"
                    />
                    <Checkbox
                        id="helpdesk"
                        label="Help Desk"
                        onChange={() => handleCheck('helpdesk')}
                        checked={state.roles.helpdesk === 'yes' ? true : false}
                        color="purple"
                    />
                    <Checkbox
                        id="tech"
                        label="Technician"
                        onChange={() => handleCheck('tech')}
                        checked={state.roles.tech === 'yes' ? true : false}
                        color="purple"
                    />
                    <Checkbox
                        id="staff"
                        label="Staff"
                        onChange={() => handleCheck('staff')}
                        color="purple"
                        checked={state.roles.staff === 'yes' ? true : false}
                    />
                    <Checkbox
                        id="third"
                        label="3rd Shift"
                        onChange={() => handleCheck('third')}
                        checked={state.roles.third_shift === 'yes' ? true : false}
                        color="purple"
                    />
                    <Checkbox
                        id="leapstart"
                        label="Leap Start"
                        onChange={() => handleCheck('leapstart')}
                        checked={state.roles.leapstart === 'yes' ? true : false}
                        color="purple"
                    />
                </FunctionalRoles>
                <AdminRoles>
                    <h2>Admin Roles</h2>
                    <Checkbox
                        id="manager"
                        label="Manager"
                        onChange={() => handleCheck('manager')}
                        checked={state.roles.manager === 'yes' ? true : false}
                        color="purple"
                        disabled={admin ? false : true}
                    />
                    <Checkbox
                        id="admin"
                        label="Administrator"
                        onChange={() => handleCheck('admin')}
                        checked={state.roles.administrator === 'yes' ? true : false}
                        color="purple"
                        disabled={admin ? false : true}
                    />
                    <Checkbox
                        id="super_admin"
                        label="Super Admin"
                        onChange={() => handleCheck('super_admin')}
                        checked={state.roles.super_admin === 'yes' ? true : false}
                        color="purple"
                        disabled={super_admin ? false : true}
                    />
                    <Checkbox
                        id="enabled"
                        label="Enabled"
                        onChange={() => handleCheck('enabled')}
                        checked={state.info.expired === 0 ? true : false}
                        color="purple"
                        disabled={state.roles.administrator === 'yes' ? false : true}
                    />
                </AdminRoles>
                {state.roles.staff === 'yes' && super_admin ?
                    <PrioritySection>
                        <FormSection id="priority">Priority</FormSection>
                        <TextInput 
                            label="Priority"
                            id="priority"
                            placeholder="1"
                            value={state.info.priority}
                            onChange={event => handleChange(event, 'priority')}
                        />
                        <div>
                            <Checkbox
                                id="first_staff"
                                label="First Shift"
                                onChange={() => handleCheck('first_staff')}
                                checked={state.roles.first_staff === 'yes' ? true : false}
                            />
                            <Checkbox
                                id="second_staff"
                                label="Second Shift"
                                onChange={() => handleCheck('second_staff')}
                                checked={state.roles.second_staff === 'yes' ? true : false}
                            />
                            <Checkbox
                                id="third_staff"
                                label="Third Shift"
                                onChange={() => handleCheck('third_staff')}
                                checked={state.roles.third_staff === 'yes' ? true : false}
                            />
                        </div>
                    </PrioritySection>
                : ''}
                <Images>
                    <Personal />
                    <Contact />
                </Images>
                <Button color="purple">Submit</Button>
                <SnackbarPortal
                    handler={snack}
                    message={`Successfully edited user: '${state.info.username}'`}
                    onClick={handleSnack}
                    heading="Success!"
                />
            </EditForm>
            <Background color="purple" />
        </Container>
    );
}

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }

    #personal {
        grid-row: 2;
    }

    #contact {
        grid-row: 6;

        &:before {
            content: '2';
        }
    }
    #roles {
        grid-row: 10;

        &:before {
            content: '3';
        }
    }
    #priority {
        &:before {
            content: '4';
        }
    }
`;

const EditForm = styled(FormEl)`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(11, auto);

    .styled-input {
        margin: 0;

        &:nth-of-type(5) {
            grid-row: 4;
            grid-column: 1/3;
            width: 67%;
        }
        &:nth-of-type(6),
        &:nth-of-type(7) {
            grid-row: 5;
        }
        &:nth-of-type(11) {
            grid-row: 8;
            grid-column: 1/3;
            width: 67%;
        }
        &:nth-of-type(12),
        &:nth-of-type(13) {
            grid-row: 9;
        }
    }

    .title {
        grid-row: 1;
    }

    button {
        grid-row: 13;
        grid-column: 3;
    }

    @media (max-width: 650px) {
        display: flex;
        flex-direction: column;

        > .styled-input {
            margin: 9px 0;
            width: 100% !important;
        }
    }
`;

const FormSection = styled.div`
    grid-column: 1/-1;
    color: #7a5dbf;
    font-size: 26px;
    font-weight: 600;
    margin: 30px 0 18px;

    &:before {
        color: var(--red);
        border: 2px solid var(--red);
        border-radius: 50%;
        padding: 4px 16px;
        margin-right: 30px;
        font-weight: 400;
        font-size: 26px;
        content: '1';
    }
`;

const FunctionalRoles = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1;

    h2 {
        font-style: italic;
        color: var(--dark-grey);
        margin: 0 0 18px;
        font-size: 18px;
        font-weight: 500;
    }
`;

const AdminRoles = styled(FunctionalRoles)`
    grid-column: 2;

    div {
        &:last-of-type {
            margin-top: auto;
        }
    }
`;

const Images = styled.div`
    grid-column: 3;
    grid-row: 2/11;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    svg {
        max-height: 215px;
        width: 100%;
        margin: 100px 0;
    }

    @media (max-width: 650px) {
        display: none;
    }
`;

const PrioritySection = styled.div`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 135px;
`;
