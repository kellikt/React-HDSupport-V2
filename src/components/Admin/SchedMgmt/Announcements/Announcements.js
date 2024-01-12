import Container from '../../Container';
import Breadcrumb from '../../Breadcrumb';
import AnnouncementsForm from './AnnouncementsForm';
import Background from '../../../Background';

const Announcements = () => {
    const links = [
        { title: 'Schedule Management', to: '/schedmgmt' },
        { title: 'Add Announcement', to: '/schedmgmt/announcements' },
    ];

    return (
        <Container>
            <h1>Add Announcement</h1>
            <Breadcrumb links={links} color="pink" />
            <AnnouncementsForm/>
            <Background color="violet" />
        </Container>
    );
};

export default Announcements;
