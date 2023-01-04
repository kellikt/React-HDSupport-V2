import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Table, TableHeading, TableRow } from '../../Admin/SchedMgmt/ClockMetrics/MetricsTableComponents';
import { ReactComponent as None } from '../../../images/Admin/Badges/NoBadge.svg';

class RankingTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
          results: [],
        };
    }

    async componentDidMount() {
        try {
            const request = await axios.post(`${process.env.REACT_APP_DB_SERVER}/get-badge-activity.php`, {
                log: "no",
                ranking: "yes",
                profile: "no",
            });

            const data = request.data;
            this.setState({
                results: data,
            });
            console.log(data);
        } catch (error) {
          console.log(error);
        }
    }

    render() {
        const { results } = this.state;

        return (
            <Table>
                <RankHeading>
                    <span>Rank</span>
                    <span>Name</span>
                    <span>Badge Count</span>
                    <span>Rarest Badge</span>
                </RankHeading>
                {results.map((result, index) => {
                  let imageID;
                  if (result.rarest_badge !== null) {
                      imageID = result.rarest_badge.link.match(/[-\w]{25,}/);
                  }
                  return (
                    <RankRow key={result.name} stagger={index}>
                        <RankColumn>{index + 1}</RankColumn>
                        <span>{result.name}</span>
                        <span>{result.badge_count}/{result.total_badges}</span>
                        {result.rarest_badge !== null ? 
                            <span>
                                {imageID !== null ? 
                                  <BadgeIcon src={`https://drive.google.com/uc?export=view&id=${imageID}`} />
                                : <NoIcon />}
                                <BadgeTitle color={result.rarest_badge.color}>{result.rarest_badge.title}</BadgeTitle>
                            </span>
                        : ""}
                    </RankRow>
                  );
                })}
            </Table>
        );
    }

}

export default RankingTable;

const NoIcon = styled(None)`
    width: 50px;
    height: 50px;

    @media (max-width: 700px) {
      display: none;
    }
`;

const BadgeIcon = styled.img`
    width: 50px;
    height: 50px;

    @media (max-width: 700px) {
      display: none;
    }
`;

const RankHeading = styled(TableHeading)`
    grid-template-columns: 0.15fr 1fr 0.25fr 0.8fr;
    grid-column-gap: 30px;
    
    span:last-of-type {
      justify-self: flex-start !important;
    }
`;

const RankRow = styled(TableRow)`
    grid-template-columns: 0.15fr 1fr 0.25fr 0.8fr;
    grid-column-gap: 30px;

    span {
      color: #6b7c93;
      font-weight: 500;
    }

    span:last-of-type {
      justify-self: flex-start !important; 
      display: inline-flex;
    }
`;

const BadgeTitle = styled.p`
    margin: 1rem 1rem 1rem;
    color: ${props => (props.color)};
`;

const RankColumn = styled.span`
    color: #3396d3 !important;
    border-right: 3px solid #e4ebf4;
`;