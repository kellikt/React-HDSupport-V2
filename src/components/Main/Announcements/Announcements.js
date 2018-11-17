import React, { Component } from 'react';
import axios from 'axios';

import { Container, Badge, CardsContainer, Card } from './Components';

class Announcements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeText: 'Announcements',
            currentHeight: 252,
            announcements: [],
            order: [0, 1, 2, 3, 4],
        };
    }

    async componentDidMount() {
        const slackRequest = await axios.get(
            `https://slack.com/api/channels.history?token=${
                process.env.REACT_APP_SLACK_TOKEN
            }&channel=${process.env.REACT_APP_SLACK_CHANNEL}&count=5`
        );
        const slackData = await slackRequest.data;

        // process the result
        const finalArray = [...Array(5).keys()];
        slackData.messages.forEach((message, index) => {
            if (index === 0) {
                // first announcement needs to be in card1.
                finalArray[1] = message;
            } else if (index === 4) {
                // the last announcement goes in card0.
                finalArray[0] = message;
            } else finalArray[index + 1] = message;
        });

        this.setState({
            announcements: finalArray,
        });
    }

    shiftCards = () => {
        const newOrder = this.state.order.map(item => {
            if (item === 0) {
                return 4;
            } else {
                return item - 1;
            }
        });

        this.setState({
            order: newOrder,
        });
    };

    render() {
        const { badgeText, currentHeight, announcements, order } = this.state;

        return (
            <Container>
                <Badge onClick={this.shiftCards}>{badgeText}</Badge>
                <CardsContainer calc={currentHeight}>
                    {announcements.map((item, index) => {
                        return (
                            <Card key={index} className={`card${order[index]}`}>
                                <span>
                                    <h3>Placeholder</h3>
                                    <h6>Nov {index}</h6>
                                </span>
                                <p>{item.text}</p>
                            </Card>
                        );
                    })}
                </CardsContainer>
            </Container>
        );
    }
}

export default Announcements;
