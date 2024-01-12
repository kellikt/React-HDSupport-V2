import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import { LayoutContext } from '../../../LayoutContext';
import Badge from './Badge';
import Spinner from '../../Spinner';
import { Container, CardsContainer, Card, NextButton } from './Components';
import { ReactComponent as Arrow } from '../../../images/icons/Arrow.svg';

export default function Announcements() {
    const { username } = useContext(LayoutContext);
    const [state, setState] = useState({
        currentHeight: 225,
        announcements: [],
        order: [],
        isLoading: true,
    });

    useEffect(() => {
        const fetchData = async() => {
            const slackRequest = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-announcements.php`, {
                token: `${process.env.REACT_APP_SLACK_TOKEN}`,
                channel: `${process.env.REACT_APP_SLACK_CHANNEL}`,
                username: username,
            });

            const slackData = await slackRequest.data;

            // process the result

            const finalArray = [];
            slackData.forEach((message, index) => {
                if (message.atype == "slack") {
                    const timestamp = getTime(message.ts);
                    const text = getText(message.text);
    
                    const finalMessage = {
                        title: text[0],
                        date: timestamp,
                        text: text[1],
                    };
                    if (index === 0) {
                        finalArray[1] = finalMessage;
                    } else if (index === slackData.length - 1) {
                        finalArray[0] = finalMessage;
                    } else finalArray[index + 1] = finalMessage;
    
                } else {
                    const timestamp = message.open_date;
                    const text = message.text;
                    const title = message.title
                    const finalMessage = {
                        title: title,
                        date: timestamp,
                        text: text,
                    };
                    if (index === 0) {
                        finalArray[1] = finalMessage;
                    } else if (index === slackData.length - 1) {
                        finalArray[0] = finalMessage;
                    } else finalArray[index + 1] = finalMessage;
                }
            });

            setState({
                ...state,
                announcements: finalArray,
                order: [...Array(slackData.length).keys()],
                isLoading: false,
            });
        }

        try {
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (state.isLoading) {
            return;
        }
        const height = document.querySelector('.card1').offsetHeight;

        setState({
            ...state,
            currentHeight: height,
        });

        
    }, [state.isLoading])

    const getText = text => {
        let announcement;

        if (text.includes('•') || text.substring(0, 9) === 'Reminder:') {
            if (text.includes('•')) {
                announcement = text.replace('•', '');
                announcement = announcement.replace('•', 'CUTHERE');
                announcement = announcement.split('CUTHERE');
            }

            // handle reminder title
            if (announcement[0].substring(0, 9) === 'Reminder:') {
                announcement[0] = announcement[0].replace("Reminder: ", "");
            }

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
    }

    const getTime = timestamp => {
        let ts = parseInt(timestamp) * 1000;
        ts = new Date(ts);

        const fullDate = ts.toDateString();
        const splitDate = fullDate.split(' ');
        const monthDay = `${splitDate[1]} ${splitDate[2]}`;

        return monthDay;
    };

    const shiftCards = () => {
        const newOrder = state.order.map(item => {
            if (item === 0) {
                return state.order.length - 1;
            } else {
                return item - 1;
            }
        });

        const height = document.querySelector('.card2').offsetHeight;

        setState({
            ...state,
            order: newOrder,
            currentHeight: height,
        });
    };

    return (
        <Container>
            <Badge />
            <CardsContainer calc={state.currentHeight}>
                {state.isLoading ? (
                    <SpinnerCard>
                        <Spinner size={50} margin={100} />
                    </SpinnerCard>
                ) : (
                    state.announcements.map((item, index) => {
                        return (
                            <Card key={index} className={`card${state.order[index]}`}>
                                <span>
                                    <h3>{item.title}</h3>
                                    <h6>{item.date}</h6>
                                </span>
                                <p dangerouslySetInnerHTML={{ __html: item.text }} />
                            </Card>
                        );
                    })
                )}
            </CardsContainer>
            <NextButton onClick={shiftCards}>
                Next <Arrow />
            </NextButton>
        </Container>
    );
}

const SpinnerCard = styled.li`
    position: absolute;
    display: grid;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    background: #fff;
    width: 100%;
    border-radius: 8px;
`;
