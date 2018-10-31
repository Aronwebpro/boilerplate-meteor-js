import React from 'react';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

//Antd
import message from 'antd/lib/message';

/**
 * Meteor Logout Handler
 * @returns React.Component -> Redirects to "/"
 */
const logOut = () => {
    Meteor.logout(() => {
        message.success('Logout successful');
    });
    return <Redirect to='/' push/>;
};

export {
    logOut
};