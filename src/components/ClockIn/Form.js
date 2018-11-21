import React, { Component } from 'react';

import { FormEl, RightSide, LeftSide, ClockState, Username, InOrOut, Comments } from './Components';
import Timer from './Timer';
import Spinner from '../Spinner';
import { ReactComponent as RedX } from '../../images/icons/RedCross.svg';
import { ReactComponent as GreenCheck } from '../../images/icons/GreenCheck.svg';
import { ReactComponent as Couch } from '../../images/Clock/Chillin.svg';
import { ReactComponent as Working } from '../../images/Clock/Working.svg';
import Button from '../Button';
import { ClockContext } from './ClockContext';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        let value = this.context;
        const { handleSubmit } = value;

        handleSubmit(this.state.text);

        this.setState({
            text: '',
        });
    };

    handleType = event => {
        this.setState({
            text: event.target.value,
        });
    };

    render() {
        const { text } = this.state;
        let value = this.context;
        const { username, clockedIn, loading } = value;

        return (
            <FormEl onSubmit={this.handleSubmit}>
                {loading ? (
                    <Spinner size={85} margin={132} />
                ) : (
                    <React.Fragment>
                        <LeftSide>
                            <ClockState>
                                {clockedIn ? <GreenCheck /> : <RedX />}
                                <div>
                                    <Username>
                                        You <strong>({username})</strong> are:
                                    </Username>
                                    <InOrOut clockedIn={clockedIn}>
                                        Clocked
                                        {clockedIn ? ' in' : ' out'}
                                    </InOrOut>
                                </div>
                            </ClockState>
                            <Timer />
                            <Comments>
                                <span>
                                    Have a weird clock-in/out? <em>Write a comment!</em>
                                </span>
                                <textarea
                                    placeholder="Write your comment here!"
                                    value={text}
                                    onChange={this.handleType}
                                />
                            </Comments>
                        </LeftSide>
                        <RightSide>
                            {clockedIn ? <Working /> : <Couch />}
                            {clockedIn ? (
                                <Button color="red">Clock out</Button>
                            ) : (
                                <Button color="green">Clock In</Button>
                            )}
                        </RightSide>
                    </React.Fragment>
                )}
            </FormEl>
        );
    }
}

Form.contextType = ClockContext;

export default Form;
