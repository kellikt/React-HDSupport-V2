import Container from '../Admin/Container';
import UserForm from './UserForm';
import Breadcrumb from '../Admin/Breadcrumb';

const SelectTimesheet = () => {
    const links = [
        { title: 'View Timesheet', to: '/timesheet' },
    ];

    return (
        <Container>
            <h1>View Timesheet</h1>
            <Breadcrumb links={links} color="green" />
            <UserForm />
        </Container>
    );
};

export default SelectTimesheet;
