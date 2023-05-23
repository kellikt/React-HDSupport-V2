import Container from '../Container';
import Form from './Form';
import Breadcrumb from '../Breadcrumb';
import Background from '../../Background';

const EditUser = () => {
    const links = [{ title: 'Account Management', to: '/acctmgmt' }, { title: 'Edit User', to: '/acctmgmt/edituser' }];

    return (
        <Container>
            <h1>Search User</h1>
            <Breadcrumb links={links} color="purple" />
            <Form />
            <Background color="purple" />
        </Container>
    );
};

export default EditUser;
