import { Component } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ReactComponent as ITSLogo } from '../../../images/icons/its.svg';

class Navbar extends Component {
    render() {
        const { children, onMouseLeave } = this.props;

        return (
            <NavbarEl onMouseLeave={onMouseLeave}>
                <NavbarList>
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                        <ITSLogo />
                    </Link>
                    {children}
                    <Logout href={`${process.env.REACT_APP_DB_SERVER}/logout.php`}>Logout</Logout>
                </NavbarList>
            </NavbarEl>
        );
    }
}

export default Navbar;

const NavbarEl = styled.nav`
    margin: 4px auto auto auto;
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;

    @media (max-width: 900px) {
        visibility: hidden;
        font-size: 15px;
    }
`;

const NavbarList = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    align-items: center;

    > a {
        margin-right: auto;

        @media (max-width: 1100px) {
            font-size: 15px;
        }

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
