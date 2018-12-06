import styled from 'styled-components';
import posed from 'react-pose';

const Faded = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        beforeChildren: 500,
        transition: {
            ease: 'circOut',
            default: { duration: 500 },
        },
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: { ease: 'circOut', duration: 500 },
    },
});

export const Table = styled(Faded)`
    display: flex;
    flex-direction: column;
    margin: 75px 0;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: var(--white);
`;

export const TableLabel = styled.div`
    background: linear-gradient(180deg, #89b1ff, #5b8def);
    border-radius: 8px 8px 0 0;
    padding: 30px;
    color: var(--white);
    border-bottom: 3px solid #e4ebf4;
    display: flex;
    align-items: center;

    > svg {
        width: 100px;
        margin-right: 24px;
        height: 100%;
    }

    h2 {
        margin: 0;
        font-weight: 600;
        font-size: 26px;
    }

    span {
        font-size: 18px;
    }
`;

export const TableHeading = styled.div`
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25fr;
    color: var(--black);
    background: #ebf1f8;
    padding: 18px;
    border-top: 3px solid #e4ebf4;
    grid-column-gap: 12px;
    align-items: center;

    span {
        font-weight: 600;
        text-transform: uppercase;

        &:last-of-type {
            justify-self: center;
        }
    }
`;

export const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25fr;
    color: var(--black);
    background: var(--white);
    padding: 18px;
    border-top: 3px solid #e4ebf4;
    grid-column-gap: 12px;
    align-items: center;

    &:last-of-type {
        border-radius: 0 0 8px 8px;
    }

    span {
        color: var(--black);

        &:last-of-type {
            justify-self: center;
        }
    }
`;

export const Timestamp = styled.div`
    h4 {
        margin: 0;
        color: ${props => (props.in === 'in' ? 'var(--green)' : 'var(--red)')};
        font-size: 18px;
    }

    span {
        color: ${props => (props.in === 'in' ? '#08be7c' : '#f36177')};
        font-size: 16px;
    }
`;

export const Comments = styled.div`
    line-height: 1.5;
    color: var(--black);
`;

export const Location = styled.div`
    display: flex;
    justify-content: center;

    svg {
        width: 20px;
        height: 20px;
    }
`;
