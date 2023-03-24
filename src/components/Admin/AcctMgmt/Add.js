import { Component } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import { LayoutContext } from '../../../LayoutContext';
import Button from '../../Button';
import { FormEl, Title } from './FormComponents';
import Breadcrumb from '../Breadcrumb';
import TextInput from '../../TextInput';
import Checkbox from '../../Checkbox';
import SnackbarPortal from '../../SnackbarPortal';
import { ReactComponent as Personal } from '../../../images/Admin/Acct/AddPersonal.svg';
import { ReactComponent as Contact } from '../../../images/Admin/Acct/AddContact.svg';
import Background from '../../Background';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                uuid: 12345678,
                zipcode: '',
                uid: 0,
                priority: 0,
            },
            snack: false,
        };
    }

    handleChange = (event, type) => {
        const { info } = this.state;

        switch (type) {
            case 'firstName':
                this.setState({
                    info: { ...info, first_name: event.target.value },
                });
                break;
            case 'lastName':
                this.setState({
                    info: { ...info, last_name: event.target.value },
                });
                break;
            case 'address':
                this.setState({
                    info: { ...info, street_address: event.target.value },
                });
                break;
            case 'city':
                this.setState({
                    info: { ...info, city: event.target.value },
                });
                break;
            case 'zip':
                this.setState({
                    info: { ...info, zipcode: event.target.value },
                });
                break;
            case 'username':
                this.setState({
                    info: { ...info, username: event.target.value.trim() },
                });
                break;
            case 'uuid':
                this.setState({
                    info: { ...info, uuid: event.target.value },
                });
                break;
            case 'nonuh':
                this.setState({
                    info: { ...info, alt_email: event.target.value },
                });
                break;
            case 'homephone':
                this.setState({
                    info: { ...info, home_phone: event.target.value },
                });
                break;
            case 'cellphone':
                this.setState({
                    info: { ...info, cell_phone: event.target.value },
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

    handleCheck = type => {
        const { roles, info } = this.state;

        switch (type) {
            case 'lab':
                if (roles.lab === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            lab: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            lab: 'yes',
                        },
                    });
                }
                break;
            case 'helpdesk':
                if (roles.helpdesk === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            helpdesk: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            helpdesk: 'yes',
                        },
                    });
                }
                break;
            case 'tech':
                if (roles.tech === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            tech: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            tech: 'yes',
                        },
                    });
                }
                break;
            case 'staff':
                if (roles.staff === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            staff: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            staff: 'yes',
                        },
                    });
                }
                break;
            case 'third':
                if (roles.third_shift === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            third_shift: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            third_shift: 'yes',
                        },
                    });
                }
                break;
            case 'leapstart':
                if (roles.leapstart === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            leapstart: 'no',
                        }
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            leapstart: 'yes'
                        }
                    })
                }
                break;
            case 'manager':
                if (roles.manager === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            manager: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
                            manager: 'yes',
                        },
                    });
                }
                break;
            case 'admin':
                if (roles.administrator === 'yes') {
                    this.setState({
                        roles: {
                            ...roles,
                            administrator: 'no',
                        },
                    });
                } else {
                    this.setState({
                        roles: {
                            ...roles,
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
                if (info.expired === 1) {
                    this.setState({
                        info: {
                            ...info,
                            expired: 0,
                        },
                    });
                } else {
                    this.setState({
                        info: {
                            ...info,
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

    handleSubmit = async event => {
        event.preventDefault();
        const { info, roles } = this.state;
        try {
            const addInfo = await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-user.php`, {
                uuid: info.uuid,
                firstName: info.first_name,
                lastName: info.last_name,
                username: info.username,
                altEmail: info.alt_email,
                homePhone: info.home_phone,
                cellPhone: info.cell_phone,
                otherPhone: info.other_phone,
                address: info.street_address,
                zip: info.zipcode,
                city: info.city,
                priority: info.priority,
            });

            const uid = await addInfo.data;

            await axios.post(`${process.env.REACT_APP_DB_SERVER}/add-user-groups.php`, {
                uid: uid,
                username: info.username,
                super_admin: roles.super_admin,
                admin: roles.administrator,
                manager: roles.manager,
                staff: roles.staff,
                helpdesk: roles.helpdesk,
                tech: roles.tech,
                lab: roles.lab,
                third_shift: roles.third_shift,
                leapstart: roles.leapstart,
                first_staff: roles.first_staff,
                second_staff: roles.second_staff,
                third_staff: roles.third_staff,
            });
        } catch (error) {
            console.log(`Error adding user: ${error}`);
        }

        this.setState({
            snack: true,
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.timeoutID = setTimeout(() => {
            this.handleSnack();
        }, 3000);
    };

    handleSnack = () => {
        this.setState({
            snack: false,
        });
    };

    componentWillUnmount() {
        window.clearTimeout(this.timeoutID);
    }

    render() {
        const links = [
            { title: 'Account Management', to: '/acctmgmt' },
            { title: 'Add User', to: '/acctmgmt/adduser' },
        ];

        const { info, roles, snack } = this.state;
        let value = this.context;
        const {
            roles: { admin, super_admin },
        } = value;

        return (
            <Container>
                <h1>Add User</h1>
                <Breadcrumb links={links} color="green" />
                <EditForm onSubmit={this.handleSubmit}>
                    <Title className="title" color="green">
                        <h1>Enter Details</h1>
                        <p>Enter in the user's information in the fields below.</p>
                    </Title>
                    <FormSection id="personal">Personal Info</FormSection>
                    <TextInput
                        label="First Name"
                        id="firstname"
                        placeholder="Jane"
                        value={info.first_name}
                        onChange={event => this.handleChange(event, 'firstName')}
                    />
                    <TextInput
                        label="Last Name"
                        id="lastname"
                        placeholder="Doe"
                        value={info.last_name}
                        onChange={event => this.handleChange(event, 'lastName')}
                    />
                    <TextInput
                        label="Street Address"
                        id="address"
                        placeholder="1234 Placeholder Street"
                        value={info.street_address}
                        onChange={event => this.handleChange(event, 'address')}
                    />
                    <TextInput
                        label="City"
                        id="city"
                        placeholder="Honolulu"
                        value={info.city}
                        onChange={event => this.handleChange(event, 'city')}
                    />
                    <TextInput
                        label="Zipcode"
                        id="zip"
                        placeholder="96822"
                        value={info.zipcode}
                        onChange={event => this.handleChange(event, 'zip')}
                    />
                    <FormSection id="contact">Contact Info</FormSection>
                    <TextInput
                        label="UH Username"
                        id="username"
                        placeholder="janed"
                        value={info.username}
                        onChange={event => this.handleChange(event, 'username')}
                    />
                    <TextInput
                        label="UH Number"
                        id="uuid"
                        placeholder="12345678"
                        value={`${info.uuid}`}
                        onChange={event => this.handleChange(event, 'uuid')}
                    />
                    <TextInput
                        label="Non-UH Email"
                        id="altemail"
                        placeholder="janed@gmail.com"
                        value={info.alt_email}
                        onChange={event => this.handleChange(event, 'nonuh')}
                    />
                    <TextInput
                        label="Home Phone"
                        id="homephone"
                        placeholder="808-956-8883"
                        value={info.home_phone}
                        onChange={event => this.handleChange(event, 'homephone')}
                    />
                    <TextInput
                        label="Cell Phone"
                        id="cellphone"
                        placeholder="808-956-8883"
                        value={info.cell_phone}
                        onChange={event => this.handleChange(event, 'cellphone')}
                    />
                    <FormSection id="roles">Roles</FormSection>
                    <FunctionalRoles>
                        <h2>Functional Roles: </h2>
                        <Checkbox
                            id="lab"
                            label="Lab Monitor"
                            onChange={() => this.handleCheck('lab')}
                            checked={roles.lab === 'yes' ? true : false}
                        />
                        <Checkbox
                            id="helpdesk"
                            label="Help Desk"
                            onChange={() => this.handleCheck('helpdesk')}
                            checked={roles.helpdesk === 'yes' ? true : false}
                        />
                        <Checkbox
                            id="tech"
                            label="Technician"
                            onChange={() => this.handleCheck('tech')}
                            checked={roles.tech === 'yes' ? true : false}
                        />
                        <Checkbox
                            id="staff"
                            label="Staff"
                            onChange={() => this.handleCheck('staff')}
                            checked={roles.staff === 'yes' ? true : false}
                        />
                        <Checkbox
                            id="third"
                            label="3rd Shift"
                            onChange={() => this.handleCheck('third')}
                            checked={roles.third_shift === 'yes' ? true : false}
                        />
                        <Checkbox
                            id="leapstart"
                            label="Leap Start"
                            onChange={() => this.handleCheck('leapstart')}
                            checked={roles.leapstart === 'yes' ? true : false}
                        />
                    </FunctionalRoles>
                    <AdminRoles>
                        <h2>Admin Roles</h2>
                        <Checkbox
                            id="manager"
                            label="Manager"
                            onChange={() => this.handleCheck('manager')}
                            checked={roles.manager === 'yes' ? true : false}
                            disabled={admin ? false : true}
                        />
                        <Checkbox
                            id="admin"
                            label="Administrator"
                            onChange={() => this.handleCheck('admin')}
                            checked={roles.administrator === 'yes' ? true : false}
                            disabled={admin ? false : true}
                        />
                        <Checkbox
                            id="super_admin"
                            label="Super Admin"
                            onChange={() => this.handleCheck('super_admin')}
                            checked={roles.super_admin === 'yes' ? true : false}
                            disabled={super_admin ? false : true}
                        />
                        <Checkbox
                            id="enabled"
                            label="Enabled"
                            onChange={() => this.handleCheck('enabled')}
                            checked={info.expired === 0 ? true : false}
                            disabled={admin ? false : true}
                        />
                    </AdminRoles>
                    {roles.staff === 'yes' && roles.super_admin === 'yes' ? 
                    <PrioritySection>
                        <FormSection id="priority">Priority</FormSection>
                        <TextInput
                            label="Priority"
                            id="priority"
                            placeholder="1"
                            value={info.priority}
                            onChange={event => this.handleChange(event, 'priority')}
                        />
                        <div>
                            <Checkbox
                                id="first_staff"
                                label="First Shift"
                                onChange={() => this.handleCheck('first_staff')}
                                checked={roles.first_staff === 'yes' ? true : false}
                            />
                            <Checkbox
                                id="second_staff"
                                label="Second Shift"
                                onChange={() => this.handleCheck('second_staff')}
                                checked={roles.second_staff === 'yes' ? true : false}
                            />
                            <Checkbox
                                id="third_staff"
                                label="Third Shift"
                                onChange={() => this.handleCheck('third_staff')}
                                checked={roles.third_staff === 'yes' ? true : false}
                            />
                        </div>
                    </PrioritySection> 
                    : ''}
                    <Images>
                        <Personal />
                        <Contact />
                    </Images>
                    <Button color="green">Submit</Button>
                    <SnackbarPortal
                        handler={snack}
                        message={`Successfully added user: '${info.username}'`}
                        onClick={this.handleSnack}
                        heading="Success!"
                    />
                </EditForm>
                <Background color="green" yOffset={90} />
            </Container>
        );
    }
}

export default Add;

Add.contextType = LayoutContext;

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
    color: var(--green);
    font-size: 26px;
    font-weight: 600;
    margin: 30px 0 18px;

    &:before {
        color: var(--gold);
        border: 2px solid var(--gold);
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