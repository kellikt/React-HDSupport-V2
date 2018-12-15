import React from 'react';

import IndexPage from '../Admin/IndexPage';
import IndexLink from '../Admin/IndexLink';
import { ReactComponent as UsernameChange } from '../../images/Email/UsernameChange.svg';
import { ReactComponent as Banner } from '../../images/Email/Banner.svg';
import { ReactComponent as FileDrop } from '../../images/Email/FileDrop.svg';
import { ReactComponent as FMO } from '../../images/Email/FMO.svg';
import { ReactComponent as SortSite } from '../../images/Email/SortSite.svg';
import { ReactComponent as TrainingLab } from '../../images/Email/TrainingLab.svg';

const index = () => {
    const links = [{ title: 'Email Generator', to: '/email' }];

    return (
        <IndexPage title="Email Generator" links={links} color="light-blue">
            <IndexLink
                color="light-blue"
                title="Banner Password Reset"
                description="Send the Banner PW reset email template."
                to={`${process.env.PUBLIC_URL}/email/banner`}
            >
                <Banner />
            </IndexLink>
            <IndexLink
                color="gold"
                title="UH Username Change"
                description="Send the UH Username terms and conditions email."
                to={`${process.env.PUBLIC_URL}/email/usernamechange`}
            >
                <UsernameChange />
            </IndexLink>
            <IndexLink
                color="purple"
                title="Filedrop Instructions"
                description="Send instructions for filedrop to a user's personal email."
                to={`${process.env.PUBLIC_URL}/email/filedrop`}
            >
                <FileDrop />
            </IndexLink>
            <IndexLink
                color="red"
                title="FMO Access"
                description="Send an email about FMO personnel accessing the ITC."
                to={`${process.env.PUBLIC_URL}/email/fmo`}
            >
                <FMO />
            </IndexLink>
            <IndexLink
                color="green"
                title="Sortsite Request"
                description="Send the Accessibility Sortsite tool confirmation email."
                to={`${process.env.PUBLIC_URL}/email/sortsite`}
            >
                <SortSite />
            </IndexLink>
            <IndexLink
                color="blue"
                title="Training Lab"
                description="Send the Training Lab reservation confirmation email."
                to={`${process.env.PUBLIC_URL}/email/training`}
            >
                <TrainingLab />
            </IndexLink>
        </IndexPage>
    );
};

export default index;
