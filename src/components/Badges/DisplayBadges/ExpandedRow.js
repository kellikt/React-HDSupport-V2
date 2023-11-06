import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

import TextInput from '../../TextInput';
import Button from '../../Button';
import { TextLabel, BadgeDiv } from '../AddBadge/AddBadgeComponents';
import { TableRow } from '../../Admin/SchedMgmt/ClockMetrics/MetricsTableComponents';

class ExpandedRow extends Component {
    constructor(props) {
        super(props);
        const { title, link, description, hex, secondaryHex } = this.props;
        this.state = {
            title: title,
            link: link,
            description: description,
            hex: hex,
            displayColorPicker: false,
            background: hex,
            secondaryHex: secondaryHex,
            displaySecondaryColorPicker: false,
            secondaryBackground: secondaryHex
        };
    }

    handleInput = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEdit = () => {
        const { bid, handleEdit } = this.props;
        const { title, description, hex, secondaryHex, link } = this.state;
        handleEdit(bid, title, hex, secondaryHex, description, link );
    };

    handleDelete = () => {
        const { bid, handleDelete } = this.props;
        handleDelete(bid);
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleColorChange = (color) => {
        this.setState({ 
            background: color.rgb,
    });
    };

    handleChangeComplete = (color) => {
        this.setState({
            hex: color.hex
        });
    };

    handleSecondaryChangeComplete = (color) => {
        this.setState({ secondaryHex: color.hex });
    };

    handleSecondaryClick = () => {
        this.setState({ displaySecondaryColorPicker: !this.state.displaySecondaryColorPicker })
    };

    handleSecondaryClose = () => {
        this.setState({ displaySecondaryColorPicker: false })
    };

    handleSecondaryColorChange = (color) => {
        this.setState({ 
            secondaryBackground: color.rgb,
    });
    };

    handleSecondaryChangeComplete = (color) => {
        this.setState({ secondaryHex: color.hex });
    };

    render() {
        const { description, link, title } = this.state;

        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: this.state.background.r ?  `rgba(${ this.state.background.r }, ${ this.state.background.g }, ${ this.state.background.b }, ${ this.state.background.a })` : `${this.state.background}`
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
                    background: this.state.secondaryBackground.r ? `rgba(${ this.state.secondaryBackground.r }, ${ this.state.secondaryBackground.g }, ${ this.state.secondaryBackground.b }, ${ this.state.secondaryBackground.a })` : this.state.secondaryBackground,
                },
            },
          });

        return (
            <Row {...this.props}>
                <TextInput id="link" label="GDrive Link to Image" name="link" value={link} onChange={this.handleInput} />
                <TextInput
                    id="title"
                    label="Name"
                    name="title"
                    value={title}
                    onChange={this.handleInput}
                />
                <TextInput
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={this.handleInput}
                />
                <BadgeInput>
                    <TextLabel>Select Badge Outline</TextLabel>
                    <BadgeColor>
                        <div style={ styles.swatch } onClick={ this.handleClick }>
                        <div style={ styles.color } />
                        </div>
                        { this.state.displayColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.background } onChange={ this.handleColorChange } onChangeComplete={this.handleChangeComplete} />
                        </div> : null }
                    </BadgeColor>
                    <TextLabel>Select Badge Background</TextLabel>
                    <BadgeColor>
                        <div style={ styles.swatch } onClick={ this.handleSecondaryClick }>
                        <div style={ secondaryStyles.color } />
                        </div>
                        { this.state.displaySecondaryColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleSecondaryClose }/>
                        <SketchPicker color={ this.state.secondaryBackground } onChange={ this.handleSecondaryColorChange } onChangeComplete={this.handleSecondaryChangeComplete} />
                        </div> : null }
                    </BadgeColor>
                </BadgeInput>
                <ButtonContainer>
                    <Button color="gold" onClick={this.handleEdit}>
                        Edit
                    </Button>
                    <Button color="red" onClick={this.handleDelete}>
                        Delete
                    </Button>
                </ButtonContainer>
            </Row>
        );
    }
}

ExpandedRow.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    description: PropTypes.string,
    hex: PropTypes.string,
    bid: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default ExpandedRow;

const Row = styled(TableRow)`
    grid-template-columns: 0.7fr 0.7fr 1fr 0.7fr 0.3fr;
    padding: 0 18px;
    height: 120px;

    span {
        &:last-of-type {
            justify-self: start;
        }
    }
`;

const BadgeInput = styled.div`
    margin-bottom: 1.4em;
`;

const BadgeColor = styled(BadgeDiv)`
    margin-top: 0.4em;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

    button {
        &:first-of-type {
            margin-bottom: 12px;
        }
    }
`;
