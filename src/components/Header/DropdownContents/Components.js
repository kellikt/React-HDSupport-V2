import styled from 'styled-components';

export const Heading = styled.h3`
    display: flex;
    align-items: center;

    text-transform: uppercase;
    transition: color 0.1s ease;
    font-weight: bold;
    letter-spacing: 0.04em;
    font-size: 17px;
    margin-top: 0;
    margin-bottom: ${props => (props.noMarginBottom ? 0 : '12px')};
    color: ${({ color }) => (color ? `var(--${color})` : 'var(--blue)')};

    &:hover {
        color: ${props => (props.noLink ? null : 'var(--black)')};
    }
`;

export const Description = styled.p`
    font-size: 15px;
    color: var(--dark-grey);
    margin: 6px 0 0 33px;
    white-space: nowrap;
`;

export const ListItem = styled.li`
    margin-bottom: ${props => (props.noMarginBottom ? 0 : '24px')};
`;

export const DropdownSection = styled.div`
    padding: var(--spacer);
    position: relative;
    z-index: 1;

    svg {
        margin-right: 15.5px;
        width: 18px;
        height: 18px;
    }
`;
