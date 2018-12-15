import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Breadcrumb from './Breadcrumb';

const IndexPage = ({ children, title, links, color }) => {
    return (
        <Container>
            <h1>{title}</h1>
            <Breadcrumb links={links} color={color} />
            {children}
        </Container>
    );
};

IndexPage.propTypes = {
    links: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default IndexPage;

const Container = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 18px;
    grid-column-gap: 18px;
    margin-top: 60px;

    h1 {
        margin: 0;
        grid-column: 1/-1;
        font-weight: 600;
        font-size: 34px;
    }

    @media (max-width: 850px) {
        grid-template-columns: 1fr;
    }
`;
