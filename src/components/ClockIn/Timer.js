import { Component } from 'react';
import styled from '@emotion/styled';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
    }

    tick = () => {
        this.setState({
            time: new Date(),
        });
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { time } = this.state;

        return (
            <Container>
                <span>The current time:</span>
                <h2>{time.toLocaleTimeString()}</h2>
            </Container>
        );
    }
}

export default Timer;

const Container = styled.div`
    grid-column: 1;
    margin-top: 36px;
    text-align: center;

    h2 {
        color: var(--blue);
        font-weight: 600;
        font-size: 34px;
        margin: 0;
        letter-spacing: 0.035em;
    }
`;
