import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Downloads } from '../../../images/icons/Downloads/Downloads.svg';
import { ReactComponent as Contract } from '../../../images/icons/Downloads/Contract.svg';

const DownloadsDropdownEl = styled.div`
    width: 390px;
`;

const WaiversContainer = styled.div`
    display: block;
    margin: 24px 0 0 33px;
`;

const DownloadsLink = styled.a`
    color: #32b783;
    font-weight: 500;
    transition: color 0.1s ease;
    display: block;
    line-height: 25px;

    &:hover {
        color: var(--black);
    }
`;

const DownloadsDropdown = () => {
    return (
        <DownloadsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem noMarginBottom noLink>
                        <Heading color="green">
                            <Downloads />
                            Waiver Downloads
                        </Heading>
                        <Description>Choose the appropriate waiver type.</Description>

                        <WaiversContainer>
                            <DownloadsLink
                                href="https://www.hawaii.edu/help/hdsupport/get_file.php?showfile=yes&fid=1155"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Waiver of Liability
                            </DownloadsLink>
                            <DownloadsLink
                                href="https://www.hawaii.edu/help/hdsupport/get_file.php?showfile=yes&fid=1156"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Waiver for Disk Recovery
                            </DownloadsLink>
                            <DownloadsLink
                                href="https://www.hawaii.edu/help/hdsupport/get_file.php?showfile=yes&fid=1157"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Waiver for Drop-Offs
                            </DownloadsLink>
                        </WaiversContainer>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem noMarginBottom>
                        <a
                            href="https://www.hawaii.edu/help/hdsupport/get_file.php?fid=1158"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Heading color="green" noMarginBottom>
                                <Contract />
                                Phone Headset Contract
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </DownloadsDropdownEl>
    );
};

export default DownloadsDropdown;
