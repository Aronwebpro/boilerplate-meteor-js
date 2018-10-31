import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
//Components
import AuthenticatedRoute from './AuthenticatedRoute';

//Pages
import Login from './pages/Auth/Login';
import ManagePassword from './pages/Auth/ManagePassword';

//Handlers
import { logOut } from '../api/logout';

class App extends React.Component {
    state = {
        isMobile: window.innerWidth < 600,
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/logout' render={logOut}/>
                    <Route path='/enroll-account/:token' render={({ match }) => <ManagePassword token={match && match.params && match.params.token} firstPassword={true}/>}/>
                    <AuthenticatedRoute path='/dashboard' render={() => <div>Hello Dashboard!</div>}/>
                    <Route path='/' component={Login}/>
                </Switch>
            </Router>
        );
    }
}

const getData = () => {
    const user = Meteor.user();
    return {
        user
    };
};

export default withTracker(getData)(App);