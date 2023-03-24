import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';
import ViewLeaveForm from './ViewLeaveForm';

const ViewLeave = () => {
    const links = [
        { title: 'Leave Requests', to: '/leave-request' },
        { title: 'View Leave Requests', to: '/leave-request/view-leave' },
    ];

    return (
        <Container>
            <h1>View Leave Requests</h1>
            <Breadcrumb links={links} color="purple" />
            <Background color="purple" />
            <ViewLeaveForm />
        </Container>
    );
};

export default ViewLeave;
