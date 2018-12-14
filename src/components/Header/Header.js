import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';
import axios from 'axios';

import DropdownContainer from './DropdownContainer/DropdownContainer';
import Navbar from './Navbar/Navbar';
import NavbarItem from './Navbar/NavbarItem';
import ToolsDropdown from './DropdownContents/ToolsDropdown';
import DownloadsDropdown from './DropdownContents/DownloadsDropdown';
import DocumentationDropdown from './DropdownContents/DocumentationDropdown';
import UserDocsDropdown from './DropdownContents/UserDocsDropdown';
import AdministrationDropdown from './DropdownContents/AdministrationDropdown';
import { LayoutContext } from '../../LayoutContext';

const navbarConfig = [
    { title: 'Tools', dropdown: ToolsDropdown },
    { title: 'Downloads', dropdown: DownloadsDropdown },
    { title: 'Documentation', dropdown: DocumentationDropdown },
    { title: 'User Docs', dropdown: UserDocsDropdown },
    { title: 'Administration', dropdown: AdministrationDropdown },
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndices: [],
            roles: {},
        };
    }

    resetDropdownState = i => {
        this.setState({
            activeIndices: typeof i === 'number' ? [i] : [],
            animatingOut: false,
        });
        delete this.animatingOutTimeout;
    };

    onMouseEnter = i => {
        if (this.animatingOutTimeout) {
            clearTimeout(this.animatingOutTimeout);
            this.resetDropdownState(i);
            return;
        }
        if (this.state.activeIndices[this.state.activeIndices.length - 1] === i) return;

        this.setState(prevState => ({
            activeIndices: prevState.activeIndices.concat(i),
            animatingOut: false,
        }));
    };

    onMouseLeave = () => {
        this.setState({
            animatingOut: true,
        });
        this.animatingOutTimeout = setTimeout(this.resetDropdownState, this.props.duration);
    };

    async componentDidMount() {
        let value = this.context;
        const { username } = value;
        try {
            const request = await axios.get(`/get-roles.php?username=${username}`);
            const data = request.data;

            const roles = {
                helpDesk: data.helpdesk === 'yes' ? true : false,
                lab: data.lab === 'yes' ? true : false,
                tech: data.tech === 'yes' ? true : false,
                staff: data.staff === 'yes' ? true : false,
                admin: data.administrator === 'yes' ? true : false,
                manager: data.manager === 'yes' ? true : false,
            };
            this.setState({
                roles: roles,
            });
        } catch (error) {
            console.log('Unable to fetch roles from DB.');
        }
    }

    render() {
        const { duration } = this.props;
        let CurrentDropdown;
        let PrevDropdown;
        let direction;

        const currentIndex = this.state.activeIndices[this.state.activeIndices.length - 1];
        const prevIndex =
            this.state.activeIndices.length > 1 && this.state.activeIndices[this.state.activeIndices.length - 2];

        if (typeof currentIndex === 'number') CurrentDropdown = navbarConfig[currentIndex].dropdown;
        if (typeof prevIndex === 'number') {
            PrevDropdown = navbarConfig[prevIndex].dropdown;
            direction = currentIndex > prevIndex ? 'right' : 'left';
        }

        return (
            <header>
                <Flipper flipKey={currentIndex}>
                    <Navbar onMouseLeave={this.onMouseLeave}>
                        {navbarConfig.map((n, index) => {
                            return (
                                <NavbarItem key={index} title={n.title} index={index} onMouseEnter={this.onMouseEnter}>
                                    {currentIndex === index && (
                                        <DropdownContainer
                                            direction={direction}
                                            animatingOut={this.state.animatingOut}
                                            duration={duration}
                                            roles={this.state.roles}
                                        >
                                            <CurrentDropdown />
                                            {PrevDropdown && <PrevDropdown />}
                                        </DropdownContainer>
                                    )}
                                </NavbarItem>
                            );
                        })}
                    </Navbar>
                </Flipper>
            </header>
        );
    }
}

Header.propTypes = {
    duration: PropTypes.number.isRequired,
};

Header.contextType = LayoutContext;

export default Header;
