import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

import { LayoutContext } from '../../LayoutContext';
import { ReactComponent as Expand } from '../../images/icons/Expand.svg';
import { ReactComponent as Minimize } from '../../images/icons/Minimize.svg';

function MissedAnnouncements() {
    const { username } = useContext(LayoutContext);
    const [state, setState] = useState({
        results: [],
        expanded: true,
    });

    const getAnnouncements = async () => {
        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-clock-in-announcements.php`, {
                token: `${process.env.REACT_APP_SLACK_TOKEN}`,
                channel: `${process.env.REACT_APP_SLACK_CHANNEL}`,
                username: username,
            });

            const data = await request.data;

            const finalData = [];

            data.forEach((message, index) => {
                if (message.atype == 'slack') {
                    const timestamp = getTime(message.ts);
                    const text = getText(message.text);

                    const finalMessage = {
                        title: text[0],
                        date: timestamp,
                        text: text[1],
                    };
                    finalData.push(finalMessage);
                } else {
                    const timestamp = getTime(message.open);
                    const text = message.text;
                    const title = message.title;
                    const finalMessage = {
                        title: title,
                        date: timestamp,
                        text: text,
                    };
                    finalData.push(finalMessage);
                }
            });
            console.log(finalData);

            setState({
                ...state,
                results: finalData,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getText = (text) => {
        let announcement;

        if (text.includes('•') || text.substring(0, 9) === 'Reminder:') {
            if (text.includes('•')) {
                announcement = text.replace('•', '');
                announcement = announcement.replace('•', 'CUTHERE');
                announcement = announcement.split('CUTHERE');
            }

            // handle reminder title
            if (announcement[0].substring(0, 9) === 'Reminder:') {
                announcement[0] = announcement[0].replace('Reminder: ', '');
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
    };

    const getTime = (timestamp) => {
        let ts = parseInt(timestamp) * 1000;
        ts = new Date(ts);

        const fullDate = ts.toDateString();
        const splitDate = fullDate.split(' ');
        const monthDay = `${splitDate[1]} ${splitDate[2]}`;

        return monthDay;
    };

    const expandAnnounce = () => {
        setState({
            ...state,
            expanded: !state.expanded,
        });
    }

    useEffect(() => {
        getAnnouncements();
    }, []);

    if (state.results.length > 0) {
        return (
            <AnnouncementCard>
                <h2>New Announcements</h2>
                {state.expanded
                    ? <React.Fragment>
                        <MinButton onClick={() => expandAnnounce()}>
                            <Minimize />
                        </MinButton>
                        <hr></hr>
                        {state.results.map((result) => {
                          return (
                              <div>
                                  <h3>
                                      {result.title} - {result.date}
                                  </h3>
                                  <div dangerouslySetInnerHTML={{ __html: result.text }} />
                              </div>
                          );
                      })}
                    </React.Fragment>
                    : 
                    <ExpandButton onClick={() => expandAnnounce()}>
                        <Expand />
                    </ExpandButton>
                    }
            </AnnouncementCard>
        );
    }
}

export default MissedAnnouncements;

const AnnouncementCard = styled.div`
    background-color: #ffbbc5;
    display: relative;
    padding: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);

    h2,
    h3,
    a {
        color: #810000;
    }

    hr {
        border-color: #810000;
    }

    @media (min-width: 1650px) {
        margin-left: 100px;
        width: 60vw;
    }
`;

const ExpandButton = styled.button`
    position: absolute;
    right: 50px;

    @media (max-width: 900px) {
        top: 140px;
    }

    @media (min-width: 901px) {
        top: 160px;
    }

    @media (min-width: 1650px) {
        left: 550px;
    }
`;

const MinButton = styled.button`
    position: absolute;
    right: 50px;

    @media (max-width: 900px) {
        top: 140px;
    }

    @media (min-width: 901px) {
        top: 160px;
    }

    @media (min-width: 1650px) {
        left: 550px;
    }
`;
