import React, { Component } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import Hamburger from '../../Hamburger';
import ToolsDropdown from '../DropdownContents/ToolsDropdown';
import DownloadsDropdown from '../DropdownContents/DownloadsDropdown';
import DocumentationDropdown from '../DropdownContents/DocumentationDropdown';
import UserDocsDropdown from '../DropdownContents/UserDocsDropdown';
import AdministrationDropdown from '../DropdownContents/AdministrationDropdown';

class ResponsiveNav extends Component {
    state = {
        open: false,
    };

    handleNav = () => {
        this.setState(state => {
            return { open: !state.open };
        });
    };

    handleEscape = event => {
        if (event.key === 'Escape') {
            this.setState({ open: false });
        }
    };

    handleClose = event => {
        window.scrollTo({
            y: 0,
            behavior: 'smooth',
        });

        this.setState({
            open: false,
        });
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscape, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscape, true);
    }

    render() {
        const { open } = this.state;
        const { roles } = this.props;

        return (
            <Container>
                <Hamburger onClick={this.handleNav} open={open} />
                <Nav pose={open ? 'opened' : 'closed'} isOpen={open} onClick={this.handleClose}>
                    <Title color="light-blue">Tools</Title>
                    <ToolsDropdown roles={roles} />
                    <Title color="green">Downloads</Title>
                    <DownloadsDropdown />
                    <Title color="blue">Documentation</Title>
                    <DocumentationDropdown roles={roles} />
                    <Title color="gold">User Docs</Title>
                    <UserDocsDropdown roles={roles} />
                    <Title color="pink">Administration</Title>
                    <AdministrationDropdown roles={roles} />
                </Nav>
            </Container>
        );
    }
}

export default ResponsiveNav;

const Container = styled.div`
    display: flex;

    > button {
        margin-left: auto;
        padding-top: 8px;
    }
`;

const AnimatedNav = () => {
    const variants = {
        opened: { opacity: 1, y: '0%' },
        closed: { opacity: 0, y: '-10%' },
    }

    return (
        <motion.nav 
            variants={variants}
        />
    )
}

const Nav = styled(AnimatedNav)`
    position: absolute;
    width: 100vw;
    height: ${props => (props.isOpen ? 'auto' : '100vh')};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--white);
    z-index: ${props => (props.isOpen ? '200' : '0')};
    display: flex;
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    flex-direction: column;
    left: 0;
    top: 0;

    > div {
        width: 100%;

        > div {
            &:nth-of-type(2) {
                background: var(--grey);
            }
        }
    }
`;

const Title = styled.h2`
    font-weight: 600;
    font-size: 24px;
    margin: 12px 12px 0;
    color: ${({ color }) => (color ? `var(--${color})` : 'var(--blue)')};
`;
