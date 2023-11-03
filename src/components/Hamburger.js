import styled from '@emotion/styled';

const Hamburger = ({ open, onClick }, props) => {
    return (
        <Container isOpen={open} onClick={onClick} {...props}>
            <span />
            <span />
            <span />
        </Container>
    );
};

export default Hamburger;

const Container = styled.button`
    display: inline-block;
    cursor: pointer;
    outline: none;
    position: relative;
    z-index: 201;

    span {
        width: 24px;
        height: 3px;
        background-color: var(--black);
        margin: 5px 0;
        transition: all 0.4s ease;
        display: block;

        &:first-of-type {
            transform: ${props => (props.isOpen ? 'rotate(-45deg) translate(-8px, 3px)' : null)};
        }

        &:nth-of-type(2) {
            opacity: ${props => (props.isOpen ? '0' : '1')};
        }

        &:last-of-type {
            transform: ${props => (props.isOpen ? 'rotate(45deg) translate(-8px, -4px)' : null)};
        }
    }
`;
