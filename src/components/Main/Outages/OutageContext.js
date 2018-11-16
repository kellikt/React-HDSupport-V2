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
            <OutageContext.Consumer
                value={{
                    focused: this.state.focused,
                    handleClick: this.handleClick,
                }}
            >
                {children}
            </OutageContext.Consumer>
        );
    }
}

export const OutageConsumer = OutageContext.Consumer;
