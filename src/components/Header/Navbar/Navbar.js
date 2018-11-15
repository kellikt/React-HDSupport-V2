import React, { Component } from 'react';
import styled from 'styled-components';

import { ReactComponent as ITSLogo } from '../../../images/icons/its.svg';

const NavbarEl = styled.nav`
    margin: auto;
`;

const NavbarList = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    align-items: center;

    > a {
        margin-right: auto;

        > svg {
            width: 50px;
            height: 50px;
        }
    }
`;

const Logout = styled.a`
    font-weight: bold;
    padding: 1rem 1.5rem 1.2rem 1.5rem;
    color: var(--black);
    z-index: 2;
    position: relative;
    transition: opacity 0.25s;
    font-size: 18px;

    &:hover,
    &:focus {
        opacity: 0.7;
    }
`;

class Navbar extends Component {
    render() {
        const { children, onMouseLeave } = this.props;

        return (
            <NavbarEl onMouseLeave={onMouseLeave}>
                <NavbarList>
                    <a href="/">
                        <ITSLogo />
                    </a>
                    {children}
                    <Logout href="/">Logout</Logout>
                </NavbarList>
            </NavbarEl>
        );
    }
}

export default Navbar;
