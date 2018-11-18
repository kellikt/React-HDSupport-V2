import React, { Component } from 'react';

export const LayoutContext = React.createContext();

export class LayoutProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false,
        };
    }

    changeSize = () => {
        this.setState(prevState => {
            return { fullScreen: !prevState.fullScreen };
        });
    };

    render() {
        const { children } = this.props;

        return (
            <LayoutContext.Provider
                value={{
                    fullScreen: this.state.fullScreen,
                    changeSize: this.changeSize,
                }}
            >
                {children}
            </LayoutContext.Provider>
        );
    }
}

export const LayoutConsumer = LayoutContext.Consumer;
