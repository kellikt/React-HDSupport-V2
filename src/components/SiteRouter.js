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
            <Router primary={false}>
                <UserRoute as={Main} path={`${process.env.PUBLIC_URL}/`} />
                <UserRoute as={ClockIn} path={`${process.env.PUBLIC_URL}/clock`} />

                <AdminRoute as={AcctMgmt} path={`${process.env.PUBLIC_URL}/acctmgmt`} />
                <AdminRoute as={EditUser} path={`${process.env.PUBLIC_URL}/acctmgmt/edituser`} />
                <AdminRoute as={Edit} path={`${process.env.PUBLIC_URL}/acctmgmt/edituser/:username`} />
                <AdminRoute as={Add} path={`${process.env.PUBLIC_URL}/acctmgmt/adduser`} />

                <AdminRoute as={SchedMgmt} path={`${process.env.PUBLIC_URL}/schedmgmt`} />
                <AdminRoute as={ClockMetrics} path={`${process.env.PUBLIC_URL}/schedmgmt/clockmetrics`} />
                <AdminRoute as={ScheduleChange} path={`${process.env.PUBLIC_URL}/schedmgmt/schedchange`} />
                <AdminRoute as={DisplayChanges} path={`${process.env.PUBLIC_URL}/schedmgmt/displaychanges`} />
                <AdminRoute as={TimesheetAdmin} path={`${process.env.PUBLIC_URL}/schedmgmt/tsadmin`} />
                <AdminRoute as={WorkWeekExceptions} path={`${process.env.PUBLIC_URL}/schedmgmt/wwexceptions`} />
                <AdminRoute as={HolidayWizard} path={`${process.env.PUBLIC_URL}/schedmgmt/holiday`} />
                <AdminRoute
                    as={Timesheet}
                    path={`${process.env.PUBLIC_URL}/schedmgmt/timesheet/:username/:year/:payPeriod`}
                />

                <UserRoute as={Email} path={`${process.env.PUBLIC_URL}/email`} />
                <UserRoute as={Banner} path={`${process.env.PUBLIC_URL}/email/banner`} />
                <UserRoute as={UsernameChange} path={`${process.env.PUBLIC_URL}/email/usernamechange`} />
                <UserRoute as={FileDrop} path={`${process.env.PUBLIC_URL}/email/filedrop`} />
                <UserRoute as={SortSite} path={`${process.env.PUBLIC_URL}/email/sortsite`} />
                <UserRoute as={TrainingLab} path={`${process.env.PUBLIC_URL}/email/training`} />
                <UserRoute as={FMO} path={`${process.env.PUBLIC_URL}/email/fmo`} />

                <Main default />
            </Router>
        );
    }
}

export default SiteRouter;
