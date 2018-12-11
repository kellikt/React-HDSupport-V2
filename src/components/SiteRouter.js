import React, { Component } from 'react';
import { Router } from '@reach/router';

import Main from './Main/Main';
import ClockIn from './ClockIn/ClockIn';

import SchedMgmt from './Admin/SchedMgmt';
import ClockMetrics from './Admin/SchedMgmt/ClockMetrics/ClockMetrics';
import ScheduleChange from './Admin/SchedMgmt/ScheduleChange/ScheduleChange';
import DisplayChanges from './Admin/SchedMgmt/DisplaySchedule/DisplayChanges';
import TimesheetAdmin from './Admin/SchedMgmt/TimesheetAdmin/TimesheetAdmin';
import HolidayWizard from './Admin/SchedMgmt/HolidayWizard';
import WorkWeekExceptions from './Admin/SchedMgmt/WorkWeekExceptions';
import Timesheet from './Admin/SchedMgmt/Timesheet';

import Email from './Email/';
import Banner from './Email/Banner';
import UsernameChange from './Email/UsernameChange';
import FileDrop from './Email/FileDrop';
import SortSite from './Email/SortSite';
import TrainingLab from './Email/TrainingLab';
import FMO from './Email/FMO';

import AcctMgmt from './Admin/AcctMgmt';
import EditUser from './Admin/AcctMgmt/EditUser';
import Edit from './Admin/AcctMgmt/Edit';
import Add from './Admin/AcctMgmt/Add';

class SiteRouter extends Component {
    render() {
        return (
            <Router primary={false}>
                <Main path="/" />
                <ClockIn path="clock" />

                <AcctMgmt path="acctmgmt" />
                <EditUser path="acctmgmt/edituser" />
                <Edit path="acctmgmt/edituser/:username" />
                <Add path="acctmgmt/adduser" />

                <SchedMgmt path="schedmgmt" />
                <ClockMetrics path="schedmgmt/clockmetrics" />
                <ScheduleChange path="schedmgmt/schedchange" />
                <DisplayChanges path="schedmgmt/displaychanges" />
                <TimesheetAdmin path="schedmgmt/tsadmin" />
                <HolidayWizard path="schedmgmt/holiday" />
                <WorkWeekExceptions path="schedmgmt/wwexceptions" />
                <Timesheet path="/schedmgmt/timesheet/:username/:year/:payPeriod" />

                <Email path="email" />
                <Banner path="email/banner" />
                <UsernameChange path="email/usernamechange" />
                <FileDrop path="email/filedrop" />
                <SortSite path="email/sortsite" />
                <TrainingLab path="email/training" />
                <FMO path="email/fmo" />
            </Router>
        );
    }
}

export default SiteRouter;
