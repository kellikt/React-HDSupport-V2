import React, { Component } from 'react';
import DateRangerPicker from '@wojtekmaj/react-daterange-picker';
import { PoseGroup } from 'react-pose';

import { FormEl, Title, DateRange, Options, Main, Radios } from './DisplayBadgesComponents';
import { ReactComponent as Graphic } from '../../../images/Admin/Badges/DisplayBadge.svg';
import TextInput from '../../TextInput';
import Button from '../../Button';
import DisplayBadgesTable from './DisplayBadgesTable';

class DisplayBadgesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badge: '',
            submitted: false,
        };
    }

    handleInput = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
            submitted: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ submitted: true });
    };

    render() {
        const { badge, submitted } = this.state;

        return (
            <React.Fragment>
                <FormEl onSubmit={this.handleSubmit}>
                    <Graphic />
                    <Main>
                        <Title>
                            <h2>Display Badges</h2>
                            <p>
                                Shows a list of badges based on search keybword. Leaving the 'Badge' field blank will fetch results for all badges.
                            </p>
                        </Title>
                        <TextInput
                            id="badge"
                            label="Badge Name"
                            placeholder="7AM Samurai"
                            value={badge}
                            onChange={this.handleInput}
                            name="badge"
                        />
                    </Main>
                    <Options>
                        <Button color="purple">Display Badges</Button>
                    </Options>
                </FormEl>
                <PoseGroup>
                    {submitted && <DisplayBadgesTable key="table" badge={badge} />}
                </PoseGroup>
            </React.Fragment>
        );
    }
}

export default DisplayBadgesForm;
