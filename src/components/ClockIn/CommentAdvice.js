import React from 'react';
import styled from 'styled-components';

import check from '../../images/icons/GreenCheck.svg';
import arrow from '../../images/icons/GreenArrow.svg';
import { ReactComponent as Exclamation } from '../../images/icons/RedExclamation.svg';
import { ReactComponent as Comments } from '../../images/Clock/Comments.svg';
import { ReactComponent as ExampleImg } from '../../images/Clock/Examples.svg';

const CommentAdvice = () => {
    return (
        <Container>
            <Reminder>
                <Comments />
                <div>
                    <Heading>
                        Use comments when clocking in &amp; out outside of your scheduled shift.
                    </Heading>
                    <MainText>
                        <p>
                            <em>Comments should include:</em>
                        </p>
                        <List>
                            <li>A brief description of your reason.</li>
                            <li>Your normal working hours.</li>
                            <li>Which approving staff member, if any.</li>
                        </List>
                        <Reprimand>
                            <Exclamation />
                            <div>
                                <p>
                                    You may be subject to reprimand if clocking in &amp; out outside of your
                                    shift unless valid and verifiable comments are made.
                                </p>
                                <p>
                                    Clocking in/out from an unauthorized device without checking with staff
                                    will be viewed as an attempt to falsify work hours.
                                </p>
                            </div>
                        </Reprimand>
                    </MainText>
                </div>
            </Reminder>
            <Examples>
                <div>
                    <Heading>Need some comment examples?</Heading>
                    <MainText>
                        <p>Feel free to use these to structure your own comments:</p>
                        <Example>
                            <span>
                                Shift from <strong>8:00a - 2:30p</strong>, clocked out at{' '}
                                <strong>2:45p</strong>:
                            </span>
                            <p>"I was stuck on a call for 15 minutes, my shift ended at 2:30 pm."</p>
                        </Example>
                        <Example>
                            <span>
                                Shift from <strong>9:00a - 3:00p</strong>, clocked out at{' '}
                                <strong>2:30p</strong>:
                            </span>
                            <p>
                                "I'm leaving 30 minutes early today, approved by Mike. My shift normally ends
                                at 3:00 pm."
                            </p>
                        </Example>
                        <Example>
                            <span>
                                Shift from <strong>8:00a - 2:30p</strong>, clocked in at{' '}
                                <strong>8:15a</strong>:
                            </span>
                            <p>
                                "I was stuck in traffic and was late this morning. My shift started at 8:00
                                am."
                            </p>
                        </Example>
                    </MainText>
                </div>
                <ExampleImg />
            </Examples>
        </Container>
    );
};

export default CommentAdvice;

const Container = styled.div`
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 100px;
    margin-top: 90px;
    padding: 30px;

    @media (max-width: 1650px) {
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
    }
`;

const Reminder = styled.div`
    display: flex;

    > svg {
        min-width: 250px;
        max-width: 275px;
        height: 100%;
        margin-right: 60px;
        align-self: center;

        @media (max-width: 800px) {
            margin: 0 0 30px;
            order: 0;
        }
    }

    @media (max-width: 800px) {
        flex-direction: column;

        &:nth-of-type(2) {
            > div {
                order: 2;
            }
        }
    }
`;

const Examples = styled(Reminder)`
    > svg {
        margin: 0 0 0 60px;

        @media (max-width: 800px) {
            margin: 0 0 30px;
        }
    }
`;

const Heading = styled.h2`
    color: var(--black);
    font-size: 24px;
    margin: 0 0 12px;
    line-height: 1.5;
`;

const MainText = styled.div`
    color: var(--dark-grey);
    line-height: 1.5;
    font-size: 16px;
`;

const List = styled.ul`
    margin: 0 0 18px 15px;

    li {
        position: relative;
        padding-left: 30px;
        margin: 12px 0;

        &:before {
            content: '';
            width: 20px;
            height: 20px;
            position: absolute;
            background-image: url(${check});
            top: 2px;
            left: 0;
        }
    }
`;

const Reprimand = styled.div`
    display: flex;
    font-size: 15px;

    svg {
        width: 22px;
        height: 22px;
        position: relative;
        margin-right: 8px;
    }
`;

const Example = styled.div`
    p {
        position: relative;
        font-style: italic;
        padding-left: 30px;
        margin: 12px 0;

        &:before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 1px;
            left: 0;
            margin-right: 6px;
            background-image: url(${arrow});
        }
    }
`;
