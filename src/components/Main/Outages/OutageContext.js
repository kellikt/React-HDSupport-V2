import React, { Component } from 'react';

export const OutageContext = React.createContext();

export class OutageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: 0,
        };
    }

    handleClick = index => {
        this.setState({
            focused: index,
        });
    };

    render() {
        const { children } = this.props;

        return (
            <OutageContext.Provider
                value={{
                    focused: this.state.focused,
                    big: this.state.big,
                    handleClick: this.handleClick,
                }}
            >
                {children}
            </OutageContext.Provider>
        );
    }
}

export const OutageConsumer = OutageContext.Consumer;
