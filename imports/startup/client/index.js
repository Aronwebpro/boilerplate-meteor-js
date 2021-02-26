import React from 'react';
import { render } from 'react-dom';

//Components
import App from '../../ui/App';

Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
});