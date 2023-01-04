import React from 'react';

import Container from '../../Admin/Container';
import Breadcrumb from '../../Admin/Breadcrumb';
import Background from '../../Background';
import RankingTable from './RankingTable';

const BadgeRanking = () => {

    const links = [
        { title: 'Badges', to: '/badges/'},
        { title: 'Badge Ranking', to: '/badges/badge-ranking/'}
    ];

    return (
        <Container>
            <h1>Badge Ranking</h1>
            <Breadcrumb links={links} color="dark-grey" />
            <Background color="grey" />
            <RankingTable />
        </Container>    
    );
};

export default BadgeRanking;
