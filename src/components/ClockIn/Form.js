import React, { Component } from 'react';
import axios from 'axios';

import { FormEl, RightSide, LeftSide, ClockState, Username, InOrOut, Comments } from './Components';
import Timer from './Timer';
import { ReactComponent as RedX } from '../../images/icons/RedCross.svg';
import { ReactComponent as Couch } from '../../images/Clock/Chillin.svg';
import Button from '../Button';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            value: '',
        };
    }

    async componentDidMount() {
        try {
            const request = await axios.get(`/get-username.php?uuid=22051104`);
            const data = await request.data;

            this.setState({
                username: data.username,
            });
        } catch (error) {
            console.log(`Error fetching clockin info: ${error}`);
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(`You submitted: ${this.state.value}`);
    };

    handleType = event => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        const { username, value } = this.state;

        return (
            <FormEl onSubmit={this.handleSubmit}>
                <LeftSide>
                    <ClockState>
                        <RedX />
                        <div>
                            <Username>
                                You <strong>({username})</strong> are:
                            </Username>
                            <InOrOut>Clocked Out</InOrOut>
                        </div>
                    </ClockState>
                    <Timer />
                    <Comments>
                        <span>
                            Have a weird clock-in/out? <em>Write a comment!</em>
                        </span>
                        <textarea
                            placeholder="Write your comment here!"
                            value={value}
                            onChange={this.handleType}
                        />
                    </Comments>
                </LeftSide>
                <RightSide>
                    <Couch />
                    <Button green>Clock In</Button>
                </RightSide>
            </FormEl>
        );
    }
}

export default Form;
