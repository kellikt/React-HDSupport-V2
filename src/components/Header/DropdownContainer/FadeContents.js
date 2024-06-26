import { forwardRef, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const FadeContents = forwardRef(({ children, duration, animatingOut, direction, roles }, ref) => {
    return (
        <FadeContainer
            // prevent screen readers from reading out hidden content
            aria-hidden={animatingOut}
            animatingOut={animatingOut}
            direction={direction}
            duration={duration}
            ref={ref}
            roles={roles}
        >
            {cloneElement(children, { roles: roles })}
        </FadeContainer>
    );
});

FadeContents.propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(['right', 'left']),
    animatingOut: PropTypes.bool,
    children: PropTypes.node,
    ref: PropTypes.func,
    roles: PropTypes.object,
};

export default FadeContents;

const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
    if (!direction) return;
    return keyframes`
        to {
            transform: translateX(0px);
            opacity: ${animatingOut ? 0 : 1};
        }
    `;
};

const FadeContainer = styled.div`
    animation-name: ${getFadeContainerKeyFrame};
    animation-duration: ${props => props.duration}ms;
    animation-fill-mode: forwards;
    opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
    top: 0;
    left: 0;
`;
