import React, { Component } from 'react';
import { Router } from '@reach/router';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';

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
            <Router primary={false} basepath={`${process.env.REACT_APP_BASE_PATH}`}>
                <UserRoute as={Main} path="/" />
                <UserRoute as={ClockIn} path="clock" />

                <AdminRoute as={AcctMgmt} path="acctmgmt" />
                <AdminRoute as={EditUser} path="acctmgmt/edituser" />
                <AdminRoute as={Edit} path="acctmgmt/edituser/:username" />
                <AdminRoute as={Add} path="acctmgmt/adduser" />

                <AdminRoute as={SchedMgmt} path="schedmgmt" />
                <AdminRoute as={ClockMetrics} path="schedmgmt/clockmetrics" />
                <AdminRoute as={ScheduleChange} path="schedmgmt/schedchange" />
                <AdminRoute as={DisplayChanges} path="schedmgmt/displaychanges" />
                <AdminRoute as={TimesheetAdmin} path="schedmgmt/tsadmin" />
                <AdminRoute as={WorkWeekExceptions} path="schedmgmt/wwexceptions" />
                <AdminRoute as={HolidayWizard} path="schedmgmt/holiday" />
                <AdminRoute as={Timesheet} path="/schedmgmt/timesheet/:username/:year/:payPeriod" />

                <UserRoute as={Email} path="email" />
                <UserRoute as={Banner} path="email/banner" />
                <UserRoute as={UsernameChange} path="email/usernamechange" />
                <UserRoute as={FileDrop} path="email/filedrop" />
                <UserRoute as={SortSite} path="email/sortsite" />
                <UserRoute as={TrainingLab} path="email/training" />
                <UserRoute as={FMO} path="email/fmo" />
            </Router>
        );
    }
}

export default SiteRouter;
