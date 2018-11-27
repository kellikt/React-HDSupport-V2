import React, { Component } from 'react';
import { Router } from '@reach/router';

import Main from './Main/Main';
import ClockIn from './ClockIn/ClockIn';
import AcctMgmt from './Admin/AcctMgmt';
import EditUser from './Admin/AcctMgmt/EditUser';
import Edit from './Admin/AcctMgmt/Edit';
import SchedMgmt from './Admin/SchedMgmt';
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
            </Router>
        );
    }
}

export default SiteRouter;
