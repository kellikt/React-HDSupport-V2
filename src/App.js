import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
`;

class App extends Component {
    render() {
        return (
            <AppContainer>
                <ContentContainer>
                    <Header duration={250} />
                    <Main />
                </ContentContainer>
            </AppContainer>
        );
    }
}

export default App;
