import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class NavbarItem extends Component {
    onMouseEnter = () => {
        this.props.onMouseEnter(this.props.index);
    };

    render() {
        const { title, children } = this.props;

        return (
            <NavbarItemEl onMouseEnter={this.onMouseEnter} onFocus={this.onMouseEnter}>
                <NavbarItemTitle>{title}</NavbarItemTitle>
                <DropdownSlot>{children}</DropdownSlot>
            </NavbarItemEl>
        );
    }
}

NavbarItem.propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node,
};

export default NavbarItem;

const NavbarItemTitle = styled.button`
    background: transparent;
    border: 0;
    font-weight: bold;
    font-family: inherit;
    font-size: 18px;
    padding: 1rem 1.5rem 1.2rem 1.5rem;
    color: var(--black);
    display: flex;
    justify-content: center;
    transition: opacity 250ms;
    cursor: pointer;
    position: relative;
    z-index: 2;

    &:hover,
    &:focus {
        opacity: 0.7;
        outline: none;
    }

    @media (max-width: 1100px) {
        font-size: 15px;
        padding: 1rem 20px 1.2rem;
    }

    @media (max-width: 900px) {
        padding: 0;
    }
`;

const NavbarItemEl = styled.li`
    position: relative;
`;

const DropdownSlot = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    perspective: 1500px;
    z-index: 2;
`;
