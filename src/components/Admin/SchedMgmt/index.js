import React from 'react';

import IndexPage from '../IndexPage';
import IndexLink from '../IndexLink';
import { ReactComponent as Sheetadmin } from '../../../images/Admin/Sched/Sheetadmin.svg';
import { ReactComponent as Metrics } from '../../../images/Admin/Sched/Metrics.svg';
import { ReactComponent as DisplaySched } from '../../../images/Admin/Sched/DisplaySched.svg';
import { ReactComponent as SchedChange } from '../../../images/Admin/Sched/SchedChange.svg';
import { ReactComponent as Holiday } from '../../../images/Admin/Sched/Holiday.svg';
import { ReactComponent as Forty } from '../../../images/Admin/Sched/Forty.svg';
import Background from '../../Background';

const index = () => {
    const links = [{ title: 'Schedule Management', to: '/schedmgmt' }];

    return (
        <IndexPage title="Schedule Management" links={links} color="light-blue">
            <IndexLink
                color="green"
                title="Timesheet Admin"
                description="View timesheets and enter exceptions."
                to={`${process.env.PUBLIC_URL}/schedmgmt/tsadmin`}
            >
                <Sheetadmin />
            </IndexLink>
            <IndexLink
                color="purple"
                title="Enter Schedule Change"
                description="Go here if someone calls out/is on vacation."
                to={`${process.env.PUBLIC_URL}/schedmgmt/schedchange`}
            >
                <SchedChange />
            </IndexLink>
            <IndexLink
                color="gold"
                title="Display Schedule Changes"
                description="Make edits to any current posted schedule changes."
                to={`${process.env.PUBLIC_URL}/schedmgmt/displaychanges`}
            >
                <DisplaySched />
            </IndexLink>
            <IndexLink
                color="light-blue"
                title="Clock-in Metrics"
                description="View stats on clock-ins for a date range."
                to={`${process.env.PUBLIC_URL}/schedmgmt/clockmetrics`}
            >
                <Metrics />
            </IndexLink>
            <IndexLink
                color="blue"
                title="Holiday Wizard"
                description="Make changes to upcoming holidays."
                to={`${process.env.PUBLIC_URL}/schedmgmt/holiday`}
            >
                <Holiday />
            </IndexLink>
            <IndexLink
                color="red"
                title="Work Week Exceptions"
                description="Define/change 40 hour work weeks."
                to={`${process.env.PUBLIC_URL}/schedmgmt/wwexceptions`}
            >
                <Forty />
            </IndexLink>
            <Background />
        </IndexPage>
    );
};

export default index;
