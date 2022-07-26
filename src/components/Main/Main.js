import React, { Component } from 'react';
import styled from 'styled-components';

import Roles from './Roles';
import ClockInButton from './ClockInButton';
import TimesheetButton from './TimesheetButton';
import LinksContainer from './LinksContainer';
import Outages from './Outages/Outages';
import { OutageProvider } from './Outages/OutageContext';
import { LayoutContext } from '../../LayoutContext';
import Announcements from './Announcements/Announcements';
import Background from '../Background';

class Main extends Component {
    render() {
        let value = this.context;
        const { firstName } = value;

        return (
            <React.Fragment>
                <Container>
                    <div>
                        <Name>Welcome {firstName}!</Name>
                        <Roles />
                        <ClockInButton />
                        <TimesheetButton/>
                        <LinksContainer />
                    </div>
                    <div>
                        <OutageProvider>
                            <Outages />
                        </OutageProvider>
                        <br/><br/>
                        <Announcements/>
                    </div>
                </Container>
                <Background />
            </React.Fragment>
        );
    }
}

Main.contextType = LayoutContext;

export default Main;

const Container = styled.main`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        margin: 0 auto;
        max-width: 600px;
    }
`;

const Name = styled.h1`
    font-weight: 500;
    font-size: 34px;
    margin-bottom: 0.5em;
`;
