import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import Background from '../../../Background';
import DisplayAnnounceForm from './DisplayAnnounceForm';

const DisplayAnnounce = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Display Announcements', to: '/schedmgmt/displayannounce' },
    ];

    return (
        <Container>
            <h1>Display Announcements</h1>
            <Breadcrumb links={links} color="cyan" />
            <DisplayAnnounceForm />
            <Background color="cyan" />
        </Container>
    );
};

export default DisplayAnnounce;
