import React, { Component } from 'react';
import axios from 'axios';

import Badge from './Badge';
import { Container, CardsContainer, Card, NextButton } from './Components';
import { ReactComponent as Arrow } from '../../../images/icons/Arrow.svg';

class Announcements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHeight: 225,
            announcements: [],
            order: [0, 1, 2, 3, 4],
        };
    }

    async componentDidMount() {
        try {
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

            const height = document.querySelector('.card1').offsetHeight;

            this.setState({
                currentHeight: height,
            });
        } catch (error) {
            console.log(`Error fetching announcements: ${error}`);
        }
    }

    shiftCards = () => {
        const newOrder = this.state.order.map(item => {
            if (item === 0) {
                return 4;
            } else {
                return item - 1;
            }
        });

        const height = document.querySelector('.card2').offsetHeight;

        this.setState({
            order: newOrder,
            currentHeight: height,
        });
    };

    render() {
        const { currentHeight, announcements, order } = this.state;

        return (
            <Container>
                <Badge />
                <CardsContainer calc={currentHeight}>
                    {announcements.map((item, index) => {
                        return (
                            <Card key={index} className={`card${order[index]}`}>
                                <span>
                                    <h3>TODO</h3>
                                    <h6>Nov {index}</h6>
                                </span>
                                <p>{item.text}</p>
                            </Card>
                        );
                    })}
                </CardsContainer>
                <NextButton onClick={this.shiftCards}>
                    Next <Arrow />
                </NextButton>
            </Container>
        );
    }
}

export default Announcements;
