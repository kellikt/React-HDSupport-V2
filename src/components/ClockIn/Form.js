import React, { Component } from 'react';

import { FormEl, RightSide, LeftSide, ClockState, Username, InOrOut, Comments } from './Components';
import Timer from './Timer';
import Spinner from '../Spinner';
import { ReactComponent as RedX } from '../../images/icons/RedCross.svg';
import { ReactComponent as GreenCheck } from '../../images/icons/GreenCheck.svg';
import { ReactComponent as Couch } from '../../images/Clock/Chillin.svg';
import { ReactComponent as WarningImg } from '../../images/Clock/Warning.svg';
import { ReactComponent as Working } from '../../images/Clock/Working.svg';
import { ReactComponent as Warning } from '../../images/icons/WarningExclamation.svg';
import Button from '../Button';
import { ClockContext } from './ClockContext';
import SnackbarPortal from '../SnackbarPortal';

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
        const { username, clockedIn, loading, timedOut } = value;

        return (
            <FormEl onSubmit={this.handleSubmit}>
                {loading ? (
                    <Spinner size={85} margin={132} />
                ) : (
                    <React.Fragment>
                        <LeftSide>
                            <ClockState>
                                {timedOut ? <Warning /> : clockedIn ? <GreenCheck /> : <RedX />}
                                <div>
                                    <Username>
                                        You <strong>({username})</strong> are:
                                    </Username>
                                    <InOrOut clockedIn={clockedIn} timedOut={timedOut}>
                                        {timedOut ? 'Timed Out' : clockedIn ? 'Clocked in' : 'Clocked out'}
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
                            {timedOut ? <WarningImg /> : clockedIn ? <Working /> : <Couch />}
                            {clockedIn ? (
                                <Button color="red">Clock out</Button>
                            ) : (
                                <Button color="green">Clock In</Button>
                            )}
                        </RightSide>
                    </React.Fragment>
                )}
                <SnackbarPortal
                    handler={timedOut}
                    message={'Your session expired. Please refresh the page.'}
                    heading={'Hey!'}
                    isError={true}
                    onClick={() => {
                        return null;
                    }}
                />
            </FormEl>
        );
    }
}

Form.contextType = ClockContext;

export default Form;
