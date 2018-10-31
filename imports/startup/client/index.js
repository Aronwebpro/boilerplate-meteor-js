import React from 'react';
import { render } from 'react-dom';
//Antd Styles
import '/imports/ui/theme.less';
//Components
import App from '../../ui/App';

Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
});