import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class App extends React.Component {
    state = {
        isMobile: window.innerWidth < 600,
    };
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/logout' render={() => { Meteor.logout(); return <Redirect to='/' push />}} />
                    <Route path='/' render={() => (
                        <div>
                            Hello World!
                        </div>
                    )} />
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