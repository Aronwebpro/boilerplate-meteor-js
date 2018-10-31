import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

const AuthenticatedRoute = (props) => (
    <>
        {props.user === undefined ? (
            // If user is currently logging in
            null
        ) : (
            returnRoute(props)
        )}
    </>
);

const returnRoute = (props) => {
    const { user } = props;
    return (
        user !== null ? (
            <Route {...props} />
        ) : (
            <>
                <Redirect to={'/'} push/>
            </>
        )
    );
};

AuthenticatedRoute.propTypes = {
    user: PropTypes.object,
    path: PropTypes.string.isRequired,
    render: PropTypes.func,
    component: PropTypes.func,
};

const getData = () => ({
    user: Meteor.user()
});

export default withTracker(getData)(AuthenticatedRoute);