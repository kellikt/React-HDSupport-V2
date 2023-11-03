import { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';
import Media from 'react-media';

import ResponsiveNav from './Navbar/ResponsiveNav';
import DropdownContainer from './DropdownContainer/DropdownContainer';
import Navbar from './Navbar/Navbar';
import NavbarItem from './Navbar/NavbarItem';
import ToolsDropdown from './DropdownContents/ToolsDropdown';
import DownloadsDropdown from './DropdownContents/DownloadsDropdown';
import DocumentationDropdown from './DropdownContents/DocumentationDropdown';
import UserDocsDropdown from './DropdownContents/UserDocsDropdown';
import AdministrationDropdown from './DropdownContents/AdministrationDropdown';
import BadgesDropdown from './DropdownContents/BadgesDropdown';
import { LayoutContext } from '../../LayoutContext';

const navbarConfig = [
    { title: 'Tools', dropdown: ToolsDropdown },
    { title: 'Downloads', dropdown: DownloadsDropdown },
    { title: 'Documentation', dropdown: DocumentationDropdown },
    { title: 'User Docs', dropdown: UserDocsDropdown },
    { title: 'Administration', dropdown: AdministrationDropdown },
    { title: 'Badges', dropdown: BadgesDropdown },
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndices: [],
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

    render() {
        let value = this.context;
        const { roles, isExpired } = value;
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
                {!isExpired && (
                    <Media query="(max-width: 900px)">
                        {matches =>
                            matches ? (
                                <ResponsiveNav roles={roles} />
                            ) : (
                                <Flipper flipKey={currentIndex}>
                                    <Navbar onMouseLeave={this.onMouseLeave}>
                                        {navbarConfig.map((n, index) => {
                                            return (
                                                <NavbarItem
                                                    key={index}
                                                    title={n.title}
                                                    index={index}
                                                    onMouseEnter={this.onMouseEnter}
                                                >
                                                    {currentIndex === index && (
                                                        <DropdownContainer
                                                            direction={direction}
                                                            animatingOut={this.state.animatingOut}
                                                            duration={duration}
                                                            roles={roles} 
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
                            )
                        }
                    </Media>
                )}
            </header>
        );
    }
}

Header.propTypes = {
    duration: PropTypes.number.isRequired,
};

Header.contextType = LayoutContext;

export default Header;
