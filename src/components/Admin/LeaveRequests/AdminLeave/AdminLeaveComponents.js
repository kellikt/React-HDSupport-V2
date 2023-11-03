import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const ConflictBox = styled.div`
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    margin-top: 24px;
    padding: 15px;
    border-top: 6px solid #6772e5;
    background: var(--white);
    width: fit-content;
    height: fit-content;
    display: inline;
    float: right;

    >p {
        display: inline;
        vertical-align: middle;
        margin-left: 10px;
    }

    >svg{
        width: 25px;
        vertical-align: middle;
    }
`;

export const StatusBox = styled(motion.div)`
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    margin-top: 24px;
    padding: 15px;
    border-top: 6px solid #e39f48;
    background: var(--white);
    width: fit-content;
    height: fit-content;
    display: inline;
    float: right;
    margin-right: 0;
    margin-left: auto;

    >p {
        display: inline;
        vertical-align: middle;
        margin-left: 10px;
    }

    >svg{
        width: 25px;
        vertical-align: middle;
    }
`;