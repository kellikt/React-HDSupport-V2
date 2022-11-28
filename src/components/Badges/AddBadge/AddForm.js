import React, { Component } from 'react';
import axios from 'axios';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

import { Form, Title, Inputs, Text, TextLabel, BadgeDiv } from './AddBadgeComponents';
import Button from '../../Button';
import TextInput from '../../TextInput';
import SnackbarPortal from '../../SnackbarPortal';
import { ReactComponent as Graphic } from '../../../images/Admin/Badges/AddBadge.svg';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            displaySecondaryColorPicker: false,
            color: '#555050',
            background: '#555050',
            secondaryColor: '#555050',
            secondaryBackground: '#555050',
            title: '',
            description: '',
            snack: false,
            message: '',
            heading: '',
            error: false,
            link: '',
        };
    }

    handleSnack = () => {
        this.setState({
            snack: false,
        });
    };

    handleError = message => {
        this.setState({
            error: true,
            snack: true,
            message: message,
            heading: 'Error!',
        });
    };

    handleChange = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleSecondaryClick = () => {
        this.setState({ displaySecondaryColorPicker: !this.state.displaySecondaryColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleSecondaryClose = () => {
        this.setState({ displaySecondaryColorPicker: false })
    }

    handleColorChange = (color) => {
        this.setState({ 
            background: color.rgb,
        });
    };

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    }

    handleSecondaryColorChange = (color) => {
        this.setState({ 
            secondaryBackground: color.rgb,
        });
    };

    handleSecondaryChangeComplete = (color) => {
        this.setState({ secondaryColor: color.hex });
    }
    

    handleSubmit = async event => {

        event.preventDefault();

        const { title, color, secondaryColor, description, link } = this.state;

        try {
            axios.post(`${process.env.REACT_APP_DB_SERVER}/add-badge.php`, {
                title: title,
                hex: color,
                hex_secondary: secondaryColor,
                description: description,
                link: link,
            }).then(function (response) {
                console.log(response);
            }).catch(function (response) {
                console.log(response);
            });
        } catch (error) {
            console.log(`Error adding badge: ${error}`);
        }
        this.setState({
            snack: true,
            message: `Successfully added badge: ${title}`,
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.timeoutID = setTimeout(() => {
            this.handleSnack();
        }, 3000);

    };

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const { title, color, background, description, message, heading, error, snack, link } = this.state;

        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.background.r }, ${ this.state.background.g }, ${ this.state.background.b }, ${ this.state.background.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });

          const secondaryStyles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.secondaryBackground.r }, ${ this.state.secondaryBackground.g }, ${ this.state.secondaryBackground.b }, ${ this.state.secondaryBackground.a })`,
                },
            },
          });

        return (
            <Form onSubmit={this.handleSubmit}>
                <Graphic/>
                <Inputs>
                    <Title>
                        <h2>Add A New Badge</h2>
                        <p>Enter badge details:</p>
                    </Title>
                    <Text>
                        <TextInput
                            id="title"
                            name="title"
                            value={title}
                            label="Badge Title"
                            onChange={this.handleChange}
                            placeholder="Enter Badge Title"
                        />
                        <TextLabel>Select Badge Outline</TextLabel>
                        <BadgeDiv>
                            <div style={ styles.swatch } onClick={ this.handleClick }>
                            <div style={ styles.color } />
                            </div>
                            { this.state.displayColorPicker ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose }/>
                            <SketchPicker color={ this.state.background } onChange={ this.handleColorChange } onChangeComplete={this.handleChangeComplete} />
                            </div> : null }

                        </BadgeDiv>
                        <TextLabel>Select Badge Background</TextLabel>
                        <BadgeDiv>
                            <div style={ styles.swatch } onClick={ this.handleSecondaryClick }>
                            <div style={ secondaryStyles.color } />
                            </div>
                            { this.state.displaySecondaryColorPicker ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleSecondaryClose }/>
                            <SketchPicker color={ this.state.secondaryBackground } onChange={ this.handleSecondaryColorChange } onChangeComplete={this.handleSecondaryChangeComplete} />
                            </div> : null }

                        </BadgeDiv>
                        <TextInput
                            id="description"
                            name="description"
                            value={description}
                            label="Description"
                            onChange={this.handleChange}
                            placeholder="Enter Badge Description"
                        />
                        <TextInput
                            id="link"
                            name="link"
                            value={link}
                            label="GDrive Shared Link"
                            onChange={this.handleChange}
                            placeholder="Enter Image GDrive Shared Link"
                        />

                    </Text>
                    <Button color="pink" onSubmit={this.handleSubmit}>Add Badge</Button>
                </Inputs>
                <SnackbarPortal
                    handler={snack}
                    message={message}
                    heading={heading}
                    onClick={this.handleSnack}
                    isError={error}
                />
            </Form>
        );
    }
}

export default AddForm;
