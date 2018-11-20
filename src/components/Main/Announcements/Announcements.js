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
                `https://slack.com/api/channels.history?token=${process.env.REACT_APP_SLACK_TOKEN}&channel=${
                    process.env.REACT_APP_SLACK_CHANNEL
                }&count=5`
            );
            const slackData = await slackRequest.data;

            // process the result
            const finalArray = [...Array(5).keys()];
            slackData.messages.forEach((message, index) => {
                const timestamp = this.getTime(message.ts);
                const text = this.getText(message.text);

                const finalMessage = {
                    title: text[0],
                    date: timestamp,
                    text: text[1],
                };

                if (index === 0) {
                    finalArray[1] = finalMessage;
                } else if (index === 4) {
                    finalArray[0] = finalMessage;
                } else finalArray[index + 1] = finalMessage;
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

    getText = text => {
        let announcement;

        if (text.includes('•')) {
            announcement = text.replace('•', '');
            announcement = announcement.replace('•', 'CUTHERE');
            announcement = announcement.split('CUTHERE');

            // handle links
            if (announcement[1].includes('http')) {
                let tempLink = announcement[1].split('<');
                tempLink = tempLink[1].split('|');

                let href = tempLink[0];
                let anchorText = tempLink[1].split('>');
                anchorText = anchorText[0];

                href = `<a href='${href}' class='commonLink'>${anchorText}</a>`;
                announcement[1] = announcement[1].replace(/<.*>/g, href);
            }

            // handle bolds
            while (announcement[1].includes('*')) {
                announcement[1] = announcement[1].replace('*', '<strong>');
                announcement[1] = announcement[1].replace('*', '</strong>');
            }
            // handle italics
            while (announcement[1].includes('_')) {
                announcement[1] = announcement[1].replace('_', '<em>');
                announcement[1] = announcement[1].replace('_', '</em>');
            }

            let breakCount = 0;
            while (announcement[1].includes('\n')) {
                if (breakCount === 0) {
                    announcement[1] = announcement[1].replace('\n', '');
                    breakCount++;
                } else announcement[1] = announcement[1].replace('\n', '<br />');
            }
        } else {
            announcement = ['Announcement', "Somebody didn't use the correct syntax :("];
        }

        return announcement;
    };

    getTime = timestamp => {
        let ts = parseInt(timestamp) * 1000;
        ts = new Date(ts);

        const fullDate = ts.toDateString();
        const splitDate = fullDate.split(' ');
        const monthDay = `${splitDate[1]} ${splitDate[2]}`;

        return monthDay;
    };

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
                                    <h3>{item.title}</h3>
                                    <h6>{item.date}</h6>
                                </span>
                                <p dangerouslySetInnerHTML={{ __html: item.text }} />
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
