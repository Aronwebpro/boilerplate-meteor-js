import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Pages
import Home from './pages/Home';


class App extends React.Component {
    state = {
        isMobile: window.innerWidth < 600,
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' component={Home}/>
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