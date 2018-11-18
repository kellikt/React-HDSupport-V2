import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header/Header';
import SiteRouter from './components/SiteRouter';
import { LayoutContext } from './LayoutContext';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    max-width: ${props => (props.fullScreen ? '100%' : '1200px')};
    width: 100%;
    margin: 0 auto;
`;

class App extends Component {
    render() {
        let value = this.context;
        const { fullScreen } = value;

        return (
            <AppContainer>
                <ContentContainer fullScreen={fullScreen}>
                    <Header duration={250} />
                    <SiteRouter />
                </ContentContainer>
            </AppContainer>
        );
    }
}

App.contextType = LayoutContext;

export default App;
