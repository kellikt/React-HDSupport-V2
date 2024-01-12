import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperAdminRoute from './SuperAdminRoute';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';

import Main from './Main/Main';
import ClockIn from './ClockIn/ClockIn';
import SelectTimesheet from './SelectTimesheet/SelectTimesheet';

import SchedMgmt from './Admin/SchedMgmt';
import ClockMetrics from './Admin/SchedMgmt/ClockMetrics/ClockMetrics';
import ScheduleChange from './Admin/SchedMgmt/ScheduleChange/ScheduleChange';
import DisplayChanges from './Admin/SchedMgmt/DisplaySchedule/DisplayChanges';
import TimesheetAdmin from './Admin/SchedMgmt/TimesheetAdmin/TimesheetAdmin';
import HolidayWizard from './Admin/SchedMgmt/HolidayWizard';
import WorkWeekExceptions from './Admin/SchedMgmt/WorkWeekExceptions';
import Timesheet from './Admin/SchedMgmt/Timesheet';
import Announcements from './Admin/SchedMgmt/Announcements/Announcements';
import DisplayAnnounce from './Admin/SchedMgmt/DisplayAnnounce/DisplayAnnounce';

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

import HDTestTemplates from './Email/HDTestTemplates';
import AddTemplate from './Email/AddTemplate';
import EditTemplate from './Email/EditTemplate';
import GoogleStorageTemplate from './Email/GoogleStorageTemplate';
import AddGoogleTemplate from './Email/AddGoogleTemplate';
import EditGoogleTemplate from './Email/EditGoogleTemplate';

import LeaveRequests from './Admin/LeaveRequests';
import RequestLeave from './Admin/LeaveRequests/RequestLeave/RequestLeave';
import ViewLeave from './Admin/LeaveRequests/ViewLeave/ViewLeave';
import AdminViewLeave from './Admin/LeaveRequests/AdminViewLeave/AdminViewLeave';
import AdminLeave from './Admin/LeaveRequests/AdminLeave/AdminLeave';

class SiteRouter extends Component {
    render() {
        return (
            <Routes primary={false}>
                <Route element={<UserRoute as={Main} />} path={`${process.env.PUBLIC_URL}/`} />
                <Route element={<UserRoute as={ClockIn} />} path={`${process.env.PUBLIC_URL}/clock`}/>
                <Route element={<UserRoute as={SelectTimesheet} />} path={`${process.env.PUBLIC_URL}/timesheet`} />

                <Route element={<AdminRoute as={AcctMgmt} />} path={`${process.env.PUBLIC_URL}/acctmgmt`} />
                <Route element={<AdminRoute as={EditUser} />} path={`${process.env.PUBLIC_URL}/acctmgmt/edituser`} />
                <Route element={<AdminRoute as={Edit} />} path={`${process.env.PUBLIC_URL}/acctmgmt/edituser/:username`} />
                <Route element={<AdminRoute as={Add} />} path={`${process.env.PUBLIC_URL}/acctmgmt/adduser`} />

                <Route element={<AdminRoute as={SchedMgmt} />} path={`${process.env.PUBLIC_URL}/schedmgmt`} />
                <Route element={<AdminRoute as={ClockMetrics} />} path={`${process.env.PUBLIC_URL}/schedmgmt/clockmetrics`} />
                <Route element={<AdminRoute as={ScheduleChange} />} path={`${process.env.PUBLIC_URL}/schedmgmt/schedchange`} />
                <Route element={<AdminRoute as={DisplayChanges} />} path={`${process.env.PUBLIC_URL}/schedmgmt/displaychanges`} />
                <Route element={<AdminRoute as={TimesheetAdmin} />} path={`${process.env.PUBLIC_URL}/schedmgmt/tsadmin`} />
                <Route element={<AdminRoute as={WorkWeekExceptions} />} path={`${process.env.PUBLIC_URL}/schedmgmt/wwexceptions`} />
                <Route element={<AdminRoute as={HolidayWizard} />} path={`${process.env.PUBLIC_URL}/schedmgmt/holiday`} />
                <Route element={<AdminRoute as={Timesheet} />} path={`${process.env.PUBLIC_URL}/schedmgmt/timesheet/:username/:year/:payPeriod`} />
                <Route element={<AdminRoute as={Announcements} />} path={`${process.env.PUBLIC_URL}/schedmgmt/announcements`} />
                <Route element={<AdminRoute as={DisplayAnnounce} />} path={`${process.env.PUBLIC_URL}/schedmgmt/displayannounce`} />

                <Route element={<AdminRoute as={HDTestTemplates} />} path={`${process.env.PUBLIC_URL}/hd-training`} />
                <Route element={<AdminRoute as={GoogleStorageTemplate} />} path={`${process.env.PUBLIC_URL}/google-storage`} />
                <Route element={<AdminRoute as={AddTemplate} />} path={`${process.env.PUBLIC_URL}/add-template`} />
                <Route element={<AdminRoute as={EditTemplate} />} path={`${process.env.PUBLIC_URL}/edit-template/:tid`} />
                <Route element={<AdminRoute as={AddGoogleTemplate} />} path={`${process.env.PUBLIC_URL}/add-google-template`} />
                <Route element={<AdminRoute as={EditGoogleTemplate} />} path={`${process.env.PUBLIC_URL}/edit-google-template/:gtid`} />
                
                <Route element={<UserRoute as={Email} />} path={`${process.env.PUBLIC_URL}/email`} />
                <Route element={<UserRoute as={Banner} />} path={`${process.env.PUBLIC_URL}/email/banner`} />
                <Route element={<UserRoute as={UsernameChange} />} path={`${process.env.PUBLIC_URL}/email/usernamechange`} />
                <Route element={<UserRoute as={FileDrop} />} path={`${process.env.PUBLIC_URL}/email/filedrop`} />
                <Route element={<UserRoute as={SortSite} />} path={`${process.env.PUBLIC_URL}/email/sortsite`} />
                <Route element={<UserRoute as={TrainingLab} />} path={`${process.env.PUBLIC_URL}/email/training`} />
                <Route element={<UserRoute as={FMO} />} path={`${process.env.PUBLIC_URL}/email/fmo`} />

                <Route element={<AdminRoute as={LeaveRequests} />} path={`${process.env.PUBLIC_URL}/leave-request`} />
                <Route element={<AdminRoute as={RequestLeave} />} path={`${process.env.PUBLIC_URL}/leave-request/request-leave`} />
                <Route element={<AdminRoute as={ViewLeave} />} path={`${process.env.PUBLIC_URL}/leave-request/view-leave`} />

                <Route element={<SuperAdminRoute as={AdminViewLeave} />} path={`${process.env.PUBLIC_URL}/leave-request/admin-leave`} />
                <Route element={<AdminRoute as={AdminLeave} />} path={`${process.env.PUBLIC_URL}/leave-request/admin-leave/:user/:startDate/:endDate/:shift`} />
                <Route path="*" element={<Main />} />
            </Routes>
        );
    }
}

export default SiteRouter;
