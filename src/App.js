import { Component } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import konami from 'konami';

import Header from './components/Header/Header';
import SiteRouter from './components/SiteRouter';
import { LayoutContext } from './LayoutContext';

class App extends Component {
    state = {
        easterEgg: false,
    };

    componentDidMount() {
        new konami(() => {
            this.setState(state => {
                return {
                    easterEgg: !state.easterEgg,
                };
            });
        });
    }

    render() {
        let value = this.context;
        const { fullScreen, loaded } = value;

        return (
            <AppContainer>
                {loaded && (
                    <ContentContainer fullScreen={fullScreen} easterEgg={this.state.easterEgg}>
                        <Header duration={250} />
                        <SiteRouter />
                    </ContentContainer>
                )}
            </AppContainer>
        );
    }
}

App.contextType = LayoutContext;

export default App;

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const animation = () => css`
    animation: ${rotate360} 1s linear infinite;
`;

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    max-width: ${props => (props.fullScreen ? '100%' : '1240px')};
    width: 100%;
    margin: 0 auto;
    padding: ${props => (props.fullScreen ? '0' : '0 20px')};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    ${({ easterEgg }) => (easterEgg ? animation : null)};
`;
